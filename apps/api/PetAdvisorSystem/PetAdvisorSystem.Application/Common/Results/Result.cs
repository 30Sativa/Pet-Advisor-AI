using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetAdvisorSystem.Application.Common.Results
{
    public class Result
    {
        public bool IsSuccess { get; protected set; }

        public string Message { get; protected set; }

        public static Result Success(string message = "")
        {
            return new Result
            {
                IsSuccess = true,
                Message = message
            };
        }

        public static Result Failure(string message)
        {
            return new Result
            {
                IsSuccess = false,
                Message = message
            };
        }
    }
    public class Result<T> : Result
    {
        public T Data { get; private set; }

        public static Result<T> Success(T data, string message = "")
            => new Result<T> { IsSuccess = true, Data = data, Message = message };

        public new static Result<T> Failure(string message)
            => new Result<T> { IsSuccess = false, Message = message };
    }
}
