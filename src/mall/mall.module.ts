import { Module } from '@nestjs/common';
import { MallGoodService } from './mall-good/mall-good.service';
import { MallGoodController } from './mall-good/mall-good.controller';
import { MallCartController } from './mall-cart/mall-cart.controller';
import { MallCartService } from './mall-cart/mall-cart.service';
import { MallOrderService } from './mall-order/mall-order.service';
import { MallOrderController } from './mall-order/mall-order.controller';
import { MallGoodCommentController } from './mall-good-comment/mall-good-comment.controller';
import { MallGoodCommentService } from './mall-good-comment/mall-good-comment.service';
import { MallGoodRelationService } from './mall-good-relation/mall-good-relation.service';
import { MallGoodRelationController } from './mall-good-relation/mall-good-relation.controller';
import { MallGoodTagController } from './mall-good-tag/mall-good-tag.controller';
import { MallGoodTagService } from './mall-good-tag/mall-good-tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MallGoodTag } from './mall-good-tag/mall-good-tag.entity';
import { MallGood } from './mall-good/mall-good.entity';
import { MallGoodRelation } from './mall-good-relation/mall-good-relation.entity';
import { MallGoodComment } from './mall-good-comment/mall-good-comment.entity';
import { MallOrder } from './mall-order/mall-order.entity';
import { MallShopController } from './mall-shop/mall-shop.controller';
import { MallShopService } from './mall-shop/mall-shop.service';
import { MallShop } from './mall-shop/mall-shop.entity';
import { MallCart } from './mall-cart/mall-cart.entity';
import { MallGoodGroupController } from './mall-good-group/mall-good-group.controller';
import { MallGoodGroupService } from './mall-good-group/mall-good-group.service';
import { MallGoodGroup } from './mall-good-group/mall-good-group.entity';
import { MallOrderGood } from './mall-order/mall-order-good.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MallShop,
      MallGoodTag,
      MallGood,
      MallGoodRelation,
      MallGoodComment,
      MallGoodGroup,
      MallOrder,
      MallOrderGood,
      MallCart
    ])
  ],
  providers: [
    MallGoodService,
    MallCartService,
    MallOrderService,
    MallGoodCommentService,
    MallGoodRelationService,
    MallGoodTagService,
    MallShopService,
    MallGoodGroupService
  ],
  controllers: [
    MallGoodController,
    MallCartController,
    MallOrderController,
    MallGoodCommentController,
    MallGoodRelationController, // 用户和商品的关系，如收藏
    MallGoodTagController,
    MallShopController,
    MallGoodGroupController
  ]
})
export class MallModule {}
