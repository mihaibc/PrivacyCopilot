
def test_import_main():
    """Test that main module can be imported"""
    import main
    assert hasattr(main, 'app')

def test_app_creation():
    """Test that FastAPI app can be created"""
    from main import app
    assert app is not None
    assert hasattr(app, 'routes')
    assert len(app.routes) > 0
