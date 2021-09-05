from flask import Flask, render_template, request, jsonify
from datetime import date, datetime


app = Flask(__name__)


def getListofItems():
    list = []
    with open("your_file.txt", "r") as text_file:
        lines = text_file.readlines()
        for line in lines:
            list.append(tuple(line.split(',')))
        text_file.close()
    return list


@app.route("/")
def mainpage():
    return render_template("index.html")


@app.route("/getSugarLevel")
def getNewSugarValue():
    return jsonify(getListofItems())


@app.route('/storeSugarLevel')
def submitNewSugarValue():
    path = "static/value.json"
    sugarvalue = request.args.get('value')
    sugarvalueType = request.args.get('type')
    currentdate = datetime.now().strftime('%Y-%m-%d')
    with open('your_file.txt', 'a') as f:
        f.writelines(currentdate+"," + sugarvalue+","+sugarvalueType+"\n")

    # Reading it back

    return "submitted"


if __name__ == "__main__":
    app.run(debug=True)
