import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import FormData from 'form-data';

@Injectable()
export class GotenbergService {
  private readonly gotenbergUrl = process.env.GOTENBERG_URL || 'http://localhost:3001';

  constructor(private readonly httpService: HttpService) {}

  async htmlToPdf(html: string): Promise<Buffer> {
    const form = new FormData();

    form.append('files', Buffer.from(html), {
      filename: 'index.html',
      contentType: 'text/html',
    });
    form.append('index.html', 'index.html');

    const response$ = this.httpService.post(
      `${this.gotenbergUrl}/forms/html`,
      form,
      {
        headers: form.getHeaders(),
        responseType: 'arraybuffer',
      },
    );
    const response: any = await lastValueFrom(response$);
    return Buffer.from(response.data);
  }
}
