def build_prompt(message, chunks, pet_info=None, memory=None):

    rag_text = "\n\n".join(chunks)

    memory_text = ""
    if memory:
        memory_text = "\n".join([f"{m.role}: {m.content}" for m in memory])

    pet_text = ""
    if pet_info:
        pet_text = f"""
Tên: {pet_info.name}
Loài: {pet_info.species}
Tuổi: {pet_info.age}
Cân nặng: {pet_info.weight}
"""

    return f"""
Bạn là trợ lý thú y AI.

QUY TẮC:
- Không kê đơn
- Không chẩn đoán chắc chắn

PET:
{pet_text}

LỊCH SỬ:
{memory_text}

NGỮ CẢNH:
{rag_text}

CÂU HỎI:
{message}

TRẢ LỜI:
"""