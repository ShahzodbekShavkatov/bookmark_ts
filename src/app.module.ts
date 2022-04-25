import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
// import { JwtMiddleware } from './middleware';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true
  }), UserModule, AuthModule, BookmarkModule, PrismaModule]
})
export class AppModule{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(JwtMiddleware)
  //     .forRoutes('bookmark/get')
  // }
}
