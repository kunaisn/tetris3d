import os
from flask import Flask


app = Flask(__name__)


@app.route("/")
def tetris3d():
    return app.send_static_file("index.html"), 200


if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8080)),
        threaded=True,
    )
