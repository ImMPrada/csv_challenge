import random
import string
from datetime import datetime, timedelta
import csv

def generate_credit_card():
    # Generate a random 16-digit credit card number
    return ''.join(random.choices(string.digits, k=16))

def generate_product_name():
    products = ['Lemonade', 'Cheese', 'Fillet', 'Wine', 'Pork', 'Lamb', 'Beef', 'Chicken', 
                'Fish', 'Bread', 'Milk', 'Eggs', 'Fruits', 'Vegetables', 'Pasta', 'Rice']
    brands = ['Calypso', 'Grana', 'Capensis', 'Alize', 'Columbia', 'Fresh', 'Premium', 
              'Organic', 'Natural', 'Deluxe', 'Gourmet', 'Artisan']
    return f"{random.choice(brands)} - {random.choice(products)} #{generate_credit_card()}"

def generate_price():
    return f"${random.uniform(10, 200):.2f}"

def generate_expiration_date():
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2024, 12, 31)
    random_date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    return random_date.strftime("%m/%d/%Y")

def generate_big_csv(filename, target_size_mb=80):
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=';')
        writer.writerow(['name', 'price', 'expiration'])
        
        # Calculate approximate number of rows needed
        # Each row is roughly 100 bytes
        target_bytes = target_size_mb * 1024 * 1024
        rows_needed = target_bytes // 100
        
        for _ in range(rows_needed):
            writer.writerow([
                generate_product_name(),
                generate_price(),
                generate_expiration_date()
            ])

if __name__ == "__main__":
    generate_big_csv('data_big.csv') 