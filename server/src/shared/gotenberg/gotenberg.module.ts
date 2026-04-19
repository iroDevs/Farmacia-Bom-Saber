import { Module, HttpModule } from '@nestjs/common';
import { GotenbergService } from './gotenberg.service';

@Module({
  imports: [HttpModule],
  providers: [GotenbergService],
  exports: [GotenbergService],
})
export class GotenbergModule {}
