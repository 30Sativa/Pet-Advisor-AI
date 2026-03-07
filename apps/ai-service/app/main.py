from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database.deps import get_db

app = FastAPI()

@app.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    print("👉 HIT DB TEST")   # 👈 thêm dòng này
    db.execute(text("SELECT 1"))
    print("👉 QUERY OK")      # 👈 thêm dòng này
    return {"status": "Database connection successful!"}