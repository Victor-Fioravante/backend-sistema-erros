import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuggestionModule } from './suggestion/suggestion.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SuggestionModule, EvaluationModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
