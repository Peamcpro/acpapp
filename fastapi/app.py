from fastapi import FastAPI
from routes.users import router as user_router
from your_database_module import connect_db, disconnect_db

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await connect_db()

@app.on_event("shutdown")
async def shutdown_event():
    await disconnect_db()

app.include_router(user_router)
