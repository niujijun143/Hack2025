from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb+srv://db123:db123@violethacks.o5ozy.mongodb.net/')
# Define databases
expenses_db = client['expenses_db']
record_db = client['record_db']

# id_ex = 0
# new_expense_id = 0

def create_trip_event(user_id, trip_name, trip_start, trip_end, currency, exchange):
    """
    Creates a new budgeting event and stores it in the records database.
    Returns the generated id_ex.
    """
    current_date = datetime.now().strftime("%Y-%m-%d")

    # Access the records collection
    records = record_db['records']

    # Get the latest id_ex and increment
    latest_event = records.find_one(sort=[('id_ex', -1)])
    new_expense_id = (latest_event.get('id_ex', 0) + 1) if latest_event else 1

    # Insert new budget event
    records.insert_one({
        'id_ex': new_expense_id,
        'user_id': [user_id],
        'trip_name': trip_name,
        'trip_start': trip_start,
        'trip_end': trip_end,
        'currency': currency,  # Fixed typo 'currecy' -> 'currency'
        'exchange': exchange,
        'expenses': []  # Empty at first, expenses will be added
    })

    return new_expense_id

def create_tripExp(user_id, id_ex, amt_h, amt_f, cat, notes):
    """
    Adds an expense to the expenses database and links it to a budgeting event.
    """
    current_date = datetime.now().strftime("%Y-%m-%d")

    # Access the expenses collection
    expenses = expenses_db['expenses']

    # Get the latest expense_id and increment
    latest_expense = expenses.find_one(sort=[('expense_id', -1)])
    new_expense_id = (latest_expense.get('expense_id', 0) + 1) if latest_expense else 1

    # Insert expense into expenses collection
    trip_data = {
        'expense_id': new_expense_id,
        'id_ex': id_ex,  # Links to the budgeting event
        'user_id': [user_id],
        'amount': amt_h,
        'amount_f': amt_f,
        'category': cat,
        'notes': notes,
        'date': current_date
    }
    expenses.insert_one(trip_data)

    # Also update the records database to include the new expense in the budget event
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
    
    user_trips = list(records.find({'user_id': user_id}, {'_id': 0}))  # Exclude MongoDB's _id field
    
    return user_trips if user_trips else "No trips found for this user."

# Example Usage
id_ex = create_trip_event(2, "Japan", "2024-01-02", "2024-01-10", "yan", 7.14)
create_tripExp(1, id_ex, 50, 45, 'Groceries', 'US')
create_tripExp(1, id_ex, 30, 25, 'Transport', 'US')

# Fetch all trips for user_id 2
user_trips = get_user_trips(2)
print(user_trips)