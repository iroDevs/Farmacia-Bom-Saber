import { Module } from '@nestjs/common';
import { PdfTemplateService } from './pdf-template.service';

@Module({
  providers: [PdfTemplateService],
  exports: [PdfTemplateService],
})
export class PdfTemplateModule {}
