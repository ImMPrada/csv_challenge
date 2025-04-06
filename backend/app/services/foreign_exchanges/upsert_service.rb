module ForeignExchanges
  class UpsertService
    CURRENCIES_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json'.freeze

    def call!
      request_rates

      foreign_exchange.rates = build_rates
      foreign_exchange.save!
    end

    def foreign_exchange
      @foreign_exchange ||= ForeignExchange.find_or_initialize_by(date:)
    end

    private

    attr_reader :date, :rates

    def request_rates
      response = HTTParty.get(CURRENCIES_URL)
      parsed_response = JSON.parse(response.body)

      @date = Date.parse(parsed_response['date'])
      @rates = parsed_response['usd']
    end

    def build_rates
      [
        {
          currency: 'eur', description: 'Euro', rate: rates['eur']
        },
        {
          currency: 'gbp', description: 'British Pound', rate: rates['gbp']
        },
        {
          currency: 'jpy', description: 'Japanese Yen', rate: rates['jpy']
        },
        {
          currency: 'cad', description: 'Canadian Dollar', rate: rates['cad']
        },
        {
          currency: 'cop', description: 'Colombian Peso', rate: rates['cop']
        }
      ]
    end
  end
end
