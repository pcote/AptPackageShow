from flask import Flask, jsonify, request
import model

app = Flask(__name__)

@app.route("/search/<search_term>")
def search(search_term):
    search_results = model.search(search_term)
    return jsonify(dict(search_results=search_results))


@app.route("/stats")
def get_stats():
    stats = model.get_stats()
    return jsonify(dict(stats=stats))

@app.route("/packageinfo/<package_name>")
def get_package_info(package_name):
    package_info = model.get_package_info(package_name)
    return jsonify(dict(package_info=package_info))


if __name__ == '__main__':
    app.run(debug=True)