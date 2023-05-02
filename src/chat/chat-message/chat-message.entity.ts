import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ChatContacts } from '../chat-contacts/chat-contacts.entity';
import { ChatMessageTypeEnum } from './chat-message.type';

@Entity()
export class ChatMessage {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty({ type: () => ChatContacts })
  @ManyToOne(() => ChatContacts)
  @JoinColumn()
    contacts: ChatContacts;

  @ApiProperty({ enum: ChatMessageTypeEnum })
  @Column({
    type: 'enum',
    enum: ChatMessageTypeEnum,
    default: ChatMessageTypeEnum.Unknown
  })
    type: ChatMessageTypeEnum;

  @ApiProperty()
  @Column({ type: 'text' })
    content: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  @JoinColumn()
    creator: User;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
    createDate: Date;
      
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
    updateDate: Date;
}