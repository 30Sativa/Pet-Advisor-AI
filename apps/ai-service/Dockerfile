#  Lấy image Python có sẵn (bản nhẹ, đủ dùng cho production)
FROM python:3.11-slim 


#  Đặt thư mục làm việc bên trong container là /app
#  giống như chạy lệnh: cd /app
WORKDIR /app


#  Copy file requirements.txt từ máy bạn vào container
#  để chuẩn bị cài thư viện Python
COPY requirements.txt .


#  Cài các thư viện trong requirements.txt
# --no-cache-dir = không lưu cache (container nhẹ hơn)
RUN pip install --no-cache-dir -r requirements.txt


#  Copy toàn bộ code project vào container
#  gồm folder app/, routes/, services/, v.v.
COPY . .


#  Khi container chạy → chạy server FastAPI
#  uvicorn = server chạy FastAPI
#  app.main:app nghĩa là:
#     app (folder) → main (file) → app (biến FastAPI)
#  0.0.0.0 = cho phép truy cập từ bên ngoài container
#  port 8000 = port server chạy
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]