from flask import Flask
from auth import auth
from views import views

from flask import jsonify
from pymongo import MongoClient
from datetime import datetime
# def create_app():
#     app = Flask(__name__)
#
#     app.register_blueprint(auth, url_prefix='/')
#     app.register_blueprint(views, url_prefix='/')
#     return app

# app = create_app()
app = Flask(__name__)


# from main import app
client = MongoClient('mongodb+srv://db123:db123@violethacks.o5ozy.mongodb.net/')
# Define databases
record_db = client['record_db']
expenses_db = client['expenses_db']
# id_ex = 0
# new_expense_id = 0


@app.route('/createTripEvent/<int:user_id>/<string:trip_name>/<string:trip_start>/<string:trip_end>/<string:currency>/<float:exchange>', methods=['POST'])
def create_trip_event(user_id, trip_name, trip_start, trip_end, currency, exchange):
    try:
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
            'currency': currency,
            'exchange': exchange,
            'expenses': []  # Empty at first, expenses will be added
        })
    except:
        return jsonify({'error': 'Item not found'}), 404
    else:
            #this is a post method y are we returning anything
            #return new_expense_id, 200
            return jsonify({'error': 'works'}), 200
@app.route('/createExp/<int:user_id>/<int:id_ex>/<float:amt_h>/<float:amt_f>/<string:cat>/<string:notes>', methods=['POST'])
def create_tripExp(user_id, id_ex, amt_h, amt_f, cat, notes):
    try:
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
    except:
        return jsonify({'error': 'Item not found'}), 404
    else:
            #post method, do we need to return aything
            #return new_expense_id, 200
            return jsonify({'error': 'works'}), 200

@app.route('/getTrips/<int:user_id>', methods=['GET'])
def get_user_trips(user_id):
    try:
        """
        Retrieves all trip records associated with a given user_id.
        """
        records = record_db['records']

        user_trips = list(records.find({'user_id': user_id}, {'_id': 0}))
    except:
        return jsonify({'error': 'Item not found'}), 404
    else:
        #return user_trips if user_trips else "No trips found for this user.", 200
        return jsonify({'no error': 'works'}), 200

@app.route('/deleteTrip/<user_id>/<trip_name>/<trip_start>/<trip_end>/<currency>/<exchange>', methods=['DELETE'])
def delete_record(user_id, trip_name, trip_start, trip_end, currency, exchange):
      try:
        records = record_db['records']
        query = {  # Create a dictionary for the query
            'user_id': user_id,
            'trip_name': trip_name,
            'trip_start': trip_start,
            'trip_end': trip_end,
            'currency': currency,
            'exchange': exchange
        }
        result = records.delete_one(query)
        #record_db.delete_one(user_id, trip_name, trip_start, trip_end, currency, exchange)
      except:
          return jsonify({'error': 'Item not found'}), 404
      else:
          #deleting, nothing to return
          return jsonify({'no error': 'works'}), 200


# Example Usage
#
# id_ex = create_trip_event(2, "Japan", "2024-01-02", "2024-01-10", "yan", 7.14)
# create_tripExp(1, id_ex, 50, 45, 'Groceries', 'US')
# create_tripExp(1, id_ex, 30, 25, 'Transport', 'US')
#
# # Fetch all trips for user_id 2
# user_trips = get_user_trips(2)
# print(user_trips)
if __name__ == '__main__':
    app.run(debug=True)

