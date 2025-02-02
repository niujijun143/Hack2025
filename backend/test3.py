from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb+srv://db123:db123@violethacks.o5ozy.mongodb.net/')

expenses_db = client['expenses_db']
record_db = client['record_db']


def create_trip_event(user_id, trip_name, trip_start, trip_end, currency, exchange):
    current_date = datetime.now().strftime("%Y-%m-%d")

    records = record_db['records']

    latest_event = records.find_one(sort=[('id_ex', -1)])
    new_expense_id = (latest_event.get('id_ex', 0) + 1) if latest_event else 1

    records.insert_one({
        'id_ex': new_expense_id,
        'user_id': [user_id],
        'trip_name': trip_name,
        'trip_start': trip_start,
        'trip_end': trip_end,
        'currency': currency,
        'exchange': exchange,
        'expenses': []
    })

    return new_expense_id

def create_tripExp(user_id, id_ex, amt_h, amt_f, cat, notes):
    """
    Adds an expense to the expenses database and links it to a budgeting event.
    """
    current_date = datetime.now().strftime("%Y-%m-%d")

    expenses = expenses_db['expenses']

    latest_expense = expenses.find_one(sort=[('expense_id', -1)])
    new_expense_id = (latest_expense.get('expense_id', 0) + 1) if latest_expense else 1

    trip_data = {
        'expense_id': new_expense_id,
        'id_ex': id_ex,
        'user_id': [user_id],
        'amount': amt_h,
        'amount_f': amt_f,
        'category': cat,
        'notes': notes,
        'date': current_date
    }
    expenses.insert_one(trip_data)

    record_db['records'].update_one(
        {'id_ex': id_ex},
        {'$push': {'expenses': trip_data}}
    )

    return new_expense_id

def get_user_trips(user_id):
    """
    Retrieves all trip records associated with a given user_id.
    """
    records = record_db['records']
    
    user_trips = list(records.find({'user_id': user_id}, {'_id': 0}))
    
    return user_trips if user_trips else "No trips found for this user."

def delete_record(user_id, trip_name, trip_start, trip_end, currency, exchange):
    record_db.delete_one(user_id, trip_name, trip_start, trip_end, currency, exchange)

# Example Usage
id_ex = create_trip_event(2, "Japan", "2024-01-02", "2024-01-10", "yan", 7.14)
create_tripExp(1, id_ex, 50, 45, 'Groceries', 'US')
create_tripExp(1, id_ex, 30, 25, 'Transport', 'US')

user_trips = get_user_trips(2)
print(user_trips)