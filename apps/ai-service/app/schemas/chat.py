from pydantic import BaseModel
from uuid import UUID
from typing import List, Optional
class MemoryItem(BaseModel):
    role: str
    content: str

class PetInfo(BaseModel):
    name: Optional[str]
    species: Optional[str]
    age: Optional[int]
    weight: Optional[float]

class ChatRequest(BaseModel):
    user_id: UUID
    conversation_id: UUID
    message: str
    pet_info: Optional[PetInfo] = None
    memory: Optional[List[MemoryItem]] = None