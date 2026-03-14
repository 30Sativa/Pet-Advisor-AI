namespace PetAdvisorSystem.WebAPi.Common
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public T Data { get; set; }

        public static ApiResponse<T> Success(T data, string message = "")
            => new ApiResponse<T> { Success = true, Data = data, Message = message };

        public static ApiResponse<T> Error(string message)
            => new ApiResponse<T> { Success = false, Message = message };
    }
}
