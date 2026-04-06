import { Module } from '@nestjs/common';
import { HealthController } from './modules/health/health.controller';
import { PrismaModule } from './shared/prisma/prisma.module';
import { RelatorioModule } from './modules/relatorio/relatorio.module';

@Module({
  imports: [PrismaModule, RelatorioModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
