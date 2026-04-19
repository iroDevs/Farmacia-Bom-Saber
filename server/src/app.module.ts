import { Module } from '@nestjs/common';
import { HealthController } from './modules/health/health.controller';

import { PrismaModule } from './shared/prisma/prisma.module';
import { RelatorioModule } from './modules/relatorio/infrastructure/http/relatorio.module';
import { UserModule } from './modules/usuario/infrastructure/http/user.module';

@Module({
  imports: [PrismaModule, RelatorioModule, UserModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
