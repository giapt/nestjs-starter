import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export enum TournamentStatus {
  DRAFT = 1,
  WAITINGFORVERIFICATION = 2,
  VERIFIED = 3,
  REGISTRATION = 4,
  COMPETING = 5,
  ENDING = 6,
}

export enum TournamentCriteria {
  isTheGreatest = "IS_THE_GREATEST",
  isTheSmallest = "IS_THE_SMALLEST",
}

export class PrizeInforDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  top: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  percentOfRewardPool: number;
}

export class TournamentSchemaInfoDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  bannerPhoto: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  thumbnailPhoto: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  numberOfTickets: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  ticketPrice: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  currency: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  nftsPerTicket: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  metadataProperty: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  propertyCalculation: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  criteria: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  playerHaveSameResult: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  providerId: number;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  rewardFromTicketOffice: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  tournamentContract: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  tournamentContractReward: string;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  chainId: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  status: number;

  @ApiProperty({
    type: [PrizeInforDto],
    required: true,
  })
  @IsNotEmpty()
  prizes: PrizeInforDto[];
}
export class ImportNFTDto {
  @ApiProperty()
  contractAddress: string;

  @ApiProperty()
  tokenId: string;
}
