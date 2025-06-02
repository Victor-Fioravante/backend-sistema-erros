import { Module } from '@nestjs/common';
import { SuggestionModule } from './suggestion/suggestion.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SuggestionModule, EvaluationModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
