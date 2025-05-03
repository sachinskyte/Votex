from flask import Flask
from flask_cors import CORS
from routes.election_routes import election_bp
from routes.auth_routes import auth_bp
from routes.vote_routes import vote_bp

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Register blueprints
    app.register_blueprint(election_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(vote_bp, url_prefix='/api')
    
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return {"status": "healthy", "service": "Votex API"}
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000) 