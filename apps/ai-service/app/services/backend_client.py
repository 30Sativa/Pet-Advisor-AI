import httpx

BASE = "http://api-service"

async def get_basic_info(conversation_id):

    async with httpx.AsyncClient(timeout=3) as client:

        r = await client.get(f"{BASE}/internal/pets/basic/{conversation_id}")

        if r.status_code == 200:
            return r.json()

        return None