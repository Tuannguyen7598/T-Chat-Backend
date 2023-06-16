
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RequestDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();

    // Trích xuất dữ liệu từ request và thực hiện các xử lý tương ứng
    const data = req.body; // Giả sử dữ liệu cần trích xuất được gửi lên trong trường 'data' của body request
    console.log('inter',data);
    
    // Gán dữ liệu vào request để sử dụng ở controller sau này

    return next.handle().pipe(map((res) =>{
            
        return data 
    }));
  }
}