import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class PdfTemplateService {
  private readonly basePath = path.join(process.cwd(), 'src', 'views', 'pdfs');

  async render(templateName: string, data: any): Promise<string> {
    // Carrega layout default
    const layoutPath = path.join(this.basePath, 'default', 'layout.hbs');
    const layoutSource = await fs.readFile(layoutPath, 'utf-8');
    const layout = Handlebars.compile(layoutSource);

    // Carrega header/footer partials
    const headerPath = path.join(this.basePath, 'default', 'header.hbs');
    const footerPath = path.join(this.basePath, 'default', 'footer.hbs');
    Handlebars.registerPartial('header', await fs.readFile(headerPath, 'utf-8'));
    Handlebars.registerPartial('footer', await fs.readFile(footerPath, 'utf-8'));

    // Carrega template específico
    const templatePath = path.join(this.basePath, 'templates', `${templateName}.hbs`);
    const templateSource = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(templateSource);
    const body = template(data);

    // Renderiza layout com body injetado
    return layout({ ...data, body });
  }
}
