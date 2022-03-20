/* eslint-disable sort-exports/sort-exports */

import { CardType } from "../enums/CardType";

export const DEFAULT_CARD_TYPE = CardType.MODDED;

export const CARD_TYPES: { readonly [key in Card]: CardType } = {
  [Card.CARD_RANDOM]: CardType.NULL, // -1
  [Card.CARD_NULL]: CardType.NULL, // 0
  [Card.CARD_FOOL]: CardType.TAROT, // 1
  [Card.CARD_MAGICIAN]: CardType.TAROT, // 2
  [Card.CARD_HIGH_PRIESTESS]: CardType.TAROT, // 3
  [Card.CARD_EMPRESS]: CardType.TAROT, // 4
  [Card.CARD_EMPEROR]: CardType.TAROT, // 5
  [Card.CARD_HIEROPHANT]: CardType.TAROT, // 6
  [Card.CARD_LOVERS]: CardType.TAROT, // 7
  [Card.CARD_CHARIOT]: CardType.TAROT, // 8
  [Card.CARD_JUSTICE]: CardType.TAROT, // 9
  [Card.CARD_HERMIT]: CardType.TAROT, // 10
  [Card.CARD_WHEEL_OF_FORTUNE]: CardType.TAROT, // 11
  [Card.CARD_STRENGTH]: CardType.TAROT, // 12
  [Card.CARD_HANGED_MAN]: CardType.TAROT, // 13
  [Card.CARD_DEATH]: CardType.TAROT, // 14
  [Card.CARD_TEMPERANCE]: CardType.TAROT, // 15
  [Card.CARD_DEVIL]: CardType.TAROT, // 16
  [Card.CARD_TOWER]: CardType.TAROT, // 17
  [Card.CARD_STARS]: CardType.TAROT, // 18
  [Card.CARD_MOON]: CardType.TAROT, // 19
  [Card.CARD_SUN]: CardType.TAROT, // 20
  [Card.CARD_JUDGEMENT]: CardType.TAROT, // 21
  [Card.CARD_WORLD]: CardType.TAROT, // 22
  [Card.CARD_CLUBS_2]: CardType.SUIT, // 23
  [Card.CARD_DIAMONDS_2]: CardType.SUIT, // 24
  [Card.CARD_SPADES_2]: CardType.SUIT, // 25
  [Card.CARD_HEARTS_2]: CardType.SUIT, // 26
  [Card.CARD_ACE_OF_CLUBS]: CardType.SUIT, // 27
  [Card.CARD_ACE_OF_DIAMONDS]: CardType.SUIT, // 28
  [Card.CARD_ACE_OF_SPADES]: CardType.SUIT, // 29
  [Card.CARD_ACE_OF_HEARTS]: CardType.SUIT, // 30
  [Card.CARD_JOKER]: CardType.SUIT, // 31
  [Card.RUNE_HAGALAZ]: CardType.RUNE, // 32
  [Card.RUNE_JERA]: CardType.RUNE, // 33
  [Card.RUNE_EHWAZ]: CardType.RUNE, // 34
  [Card.RUNE_DAGAZ]: CardType.RUNE, // 35
  [Card.RUNE_ANSUZ]: CardType.RUNE, // 36
  [Card.RUNE_PERTHRO]: CardType.RUNE, // 37
  [Card.RUNE_BERKANO]: CardType.RUNE, // 38
  [Card.RUNE_ALGIZ]: CardType.RUNE, // 39
  [Card.RUNE_BLANK]: CardType.RUNE, // 40
  [Card.RUNE_BLACK]: CardType.RUNE, // 41
  [Card.CARD_CHAOS]: CardType.SPECIAL, // 42
  [Card.CARD_CREDIT]: CardType.SPECIAL, // 43
  [Card.CARD_RULES]: CardType.SPECIAL, // 44
  [Card.CARD_HUMANITY]: CardType.SPECIAL, // 45
  [Card.CARD_SUICIDE_KING]: CardType.SPECIAL, // 46
  [Card.CARD_GET_OUT_OF_JAIL]: CardType.SPECIAL, // 47
  [Card.CARD_QUESTIONMARK]: CardType.SPECIAL, // 48
  [Card.CARD_DICE_SHARD]: CardType.OBJECT, // 49
  [Card.CARD_EMERGENCY_CONTACT]: CardType.OBJECT, // 50
  [Card.CARD_HOLY]: CardType.SPECIAL, // 51
  [Card.CARD_HUGE_GROWTH]: CardType.SPECIAL, // 52
  [Card.CARD_ANCIENT_RECALL]: CardType.SPECIAL, // 53
  [Card.CARD_ERA_WALK]: CardType.SPECIAL, // 54
  [Card.RUNE_SHARD]: CardType.RUNE, // 55
  [Card.CARD_REVERSE_FOOL]: CardType.TAROT_REVERSE, // 56
  [Card.CARD_REVERSE_MAGICIAN]: CardType.TAROT_REVERSE, // 57
  [Card.CARD_REVERSE_HIGH_PRIESTESS]: CardType.TAROT_REVERSE, // 58
  [Card.CARD_REVERSE_EMPRESS]: CardType.TAROT_REVERSE, // 59
  [Card.CARD_REVERSE_EMPEROR]: CardType.TAROT_REVERSE, // 60
  [Card.CARD_REVERSE_HIEROPHANT]: CardType.TAROT_REVERSE, // 61
  [Card.CARD_REVERSE_LOVERS]: CardType.TAROT_REVERSE, // 62
  [Card.CARD_REVERSE_CHARIOT]: CardType.TAROT_REVERSE, // 63
  [Card.CARD_REVERSE_JUSTICE]: CardType.TAROT_REVERSE, // 64
  [Card.CARD_REVERSE_HERMIT]: CardType.TAROT_REVERSE, // 65
  [Card.CARD_REVERSE_WHEEL_OF_FORTUNE]: CardType.TAROT_REVERSE, // 66
  [Card.CARD_REVERSE_STRENGTH]: CardType.TAROT_REVERSE, // 67
  [Card.CARD_REVERSE_HANGED_MAN]: CardType.TAROT_REVERSE, // 68
  [Card.CARD_REVERSE_DEATH]: CardType.TAROT_REVERSE, // 69
  [Card.CARD_REVERSE_TEMPERANCE]: CardType.TAROT_REVERSE, // 70
  [Card.CARD_REVERSE_DEVIL]: CardType.TAROT_REVERSE, // 71
  [Card.CARD_REVERSE_TOWER]: CardType.TAROT_REVERSE, // 72
  [Card.CARD_REVERSE_STARS]: CardType.TAROT_REVERSE, // 73
  [Card.CARD_REVERSE_MOON]: CardType.TAROT_REVERSE, // 74
  [Card.CARD_REVERSE_SUN]: CardType.TAROT_REVERSE, // 75
  [Card.CARD_REVERSE_JUDGEMENT]: CardType.TAROT_REVERSE, // 76
  [Card.CARD_REVERSE_WORLD]: CardType.TAROT_REVERSE, // 77
  [Card.CARD_CRACKED_KEY]: CardType.OBJECT, // 78
  [Card.CARD_QUEEN_OF_HEARTS]: CardType.SUIT, // 79
  [Card.CARD_WILD]: CardType.SPECIAL, // 80
  [Card.CARD_SOUL_ISAAC]: CardType.RUNE, // 81
  [Card.CARD_SOUL_MAGDALENE]: CardType.RUNE, // 82
  [Card.CARD_SOUL_CAIN]: CardType.RUNE, // 83
  [Card.CARD_SOUL_JUDAS]: CardType.RUNE, // 84
  [Card.CARD_SOUL_BLUEBABY]: CardType.RUNE, // 85
  [Card.CARD_SOUL_EVE]: CardType.RUNE, // 86
  [Card.CARD_SOUL_SAMSON]: CardType.RUNE, // 87
  [Card.CARD_SOUL_AZAZEL]: CardType.RUNE, // 88
  [Card.CARD_SOUL_LAZARUS]: CardType.RUNE, // 89
  [Card.CARD_SOUL_EDEN]: CardType.RUNE, // 90
  [Card.CARD_SOUL_LOST]: CardType.RUNE, // 91
  [Card.CARD_SOUL_LILITH]: CardType.RUNE, // 92
  [Card.CARD_SOUL_KEEPER]: CardType.RUNE, // 93
  [Card.CARD_SOUL_APOLLYON]: CardType.RUNE, // 94
  [Card.CARD_SOUL_FORGOTTEN]: CardType.RUNE, // 95
  [Card.CARD_SOUL_BETHANY]: CardType.RUNE, // 96
  [Card.CARD_SOUL_JACOB]: CardType.RUNE, // 97
  [Card.NUM_CARDS]: DEFAULT_CARD_TYPE, // 98
};
