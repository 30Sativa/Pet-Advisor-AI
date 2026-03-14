from openai import OpenAI
from sqlalchemy import text
from app.database.session import SessionLocal

client = OpenAI()

def retrieve_chunks(query: str):

    db = SessionLocal()

    try:

        emb = client.embeddings.create(
            model="text-embedding-3-small",
            input=query
        ).data[0].embedding

        sql = """
        SELECT content
        FROM match_chunks(
            CAST(:embedding AS vector),
            0.75,
            3,
            '{}'::jsonb
        )
        """

        rows = db.execute(text(sql), {"embedding": emb}).fetchall()

        return [r[0] for r in rows]

    finally:
        db.close()