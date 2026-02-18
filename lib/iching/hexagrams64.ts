export type Hexagram = {
  /** King Wen sequence number (1-64) */
  number: number;
  /** Unicode hexagram symbol */
  symbol: string;
  /** English title */
  name: string;
  /** Common Chinese title (Hanzi) */
  chinese: string;
  /** Pinyin transliteration */
  pinyin: string;
  /** Common one-line gloss */
  meaning: string;
};

/**
 * I Ching (Yijing) hexagrams in traditional King Wen sequence.
 */
export const HEXAGRAMS_64: readonly Hexagram[] = [
  { number: 1, symbol: '䷀', name: 'Force', chinese: '乾', pinyin: 'Qián', meaning: 'The Creative' },
  { number: 2, symbol: '䷁', name: 'Field', chinese: '坤', pinyin: 'Kūn', meaning: 'The Receptive' },
  { number: 3, symbol: '䷂', name: 'Sprouting', chinese: '屯', pinyin: 'Zhūn', meaning: 'Difficulty at the Beginning' },
  { number: 4, symbol: '䷃', name: 'Enveloping', chinese: '蒙', pinyin: 'Méng', meaning: 'Youthful Folly' },
  { number: 5, symbol: '䷄', name: 'Attending', chinese: '需', pinyin: 'Xū', meaning: 'Waiting' },
  { number: 6, symbol: '䷅', name: 'Arguing', chinese: '訟', pinyin: 'Sòng', meaning: 'Conflict' },
  { number: 7, symbol: '䷆', name: 'Leading', chinese: '師', pinyin: 'Shī', meaning: 'The Army' },
  { number: 8, symbol: '䷇', name: 'Grouping', chinese: '比', pinyin: 'Bǐ', meaning: 'Holding Together' },
  { number: 9, symbol: '䷈', name: 'Small Accumulating', chinese: '小畜', pinyin: 'Xiǎo Chù', meaning: 'Small Taming' },
  { number: 10, symbol: '䷉', name: 'Treading', chinese: '履', pinyin: 'Lǚ', meaning: 'Conduct' },
  { number: 11, symbol: '䷊', name: 'Pervading', chinese: '泰', pinyin: 'Tài', meaning: 'Peace' },
  { number: 12, symbol: '䷋', name: 'Obstruction', chinese: '否', pinyin: 'Pǐ', meaning: 'Standstill' },
  { number: 13, symbol: '䷌', name: 'Concording People', chinese: '同人', pinyin: 'Tóng Rén', meaning: 'Fellowship' },
  { number: 14, symbol: '䷍', name: 'Great Possessing', chinese: '大有', pinyin: 'Dà Yǒu', meaning: 'Great Possession' },
  { number: 15, symbol: '䷎', name: 'Humbling', chinese: '謙', pinyin: 'Qiān', meaning: 'Modesty' },
  { number: 16, symbol: '䷏', name: 'Providing-For', chinese: '豫', pinyin: 'Yù', meaning: 'Enthusiasm' },
  { number: 17, symbol: '䷐', name: 'Following', chinese: '隨', pinyin: 'Suí', meaning: 'Following' },
  { number: 18, symbol: '䷑', name: 'Correcting', chinese: '蠱', pinyin: 'Gǔ', meaning: 'Work on What Has Been Spoiled' },
  { number: 19, symbol: '䷒', name: 'Nearing', chinese: '臨', pinyin: 'Lín', meaning: 'Approach' },
  { number: 20, symbol: '䷓', name: 'Viewing', chinese: '觀', pinyin: 'Guān', meaning: 'Contemplation' },
  { number: 21, symbol: '䷔', name: 'Gnawing Bite', chinese: '噬嗑', pinyin: 'Shì Kè', meaning: 'Biting Through' },
  { number: 22, symbol: '䷕', name: 'Adorning', chinese: '賁', pinyin: 'Bì', meaning: 'Grace' },
  { number: 23, symbol: '䷖', name: 'Stripping', chinese: '剝', pinyin: 'Bō', meaning: 'Splitting Apart' },
  { number: 24, symbol: '䷗', name: 'Returning', chinese: '復', pinyin: 'Fù', meaning: 'Return' },
  { number: 25, symbol: '䷘', name: 'Without Embroiling', chinese: '無妄', pinyin: 'Wú Wàng', meaning: 'Innocence' },
  { number: 26, symbol: '䷙', name: 'Great Accumulating', chinese: '大畜', pinyin: 'Dà Chù', meaning: 'Great Taming' },
  { number: 27, symbol: '䷚', name: 'Swallowing', chinese: '頤', pinyin: 'Yí', meaning: 'Nourishment' },
  { number: 28, symbol: '䷛', name: 'Great Exceeding', chinese: '大過', pinyin: 'Dà Guò', meaning: 'Great Preponderance' },
  { number: 29, symbol: '䷜', name: 'Gorge', chinese: '坎', pinyin: 'Kǎn', meaning: 'The Abysmal' },
  { number: 30, symbol: '䷝', name: 'Radiance', chinese: '離', pinyin: 'Lí', meaning: 'The Clinging, Fire' },
  { number: 31, symbol: '䷞', name: 'Conjoining', chinese: '咸', pinyin: 'Xián', meaning: 'Influence' },
  { number: 32, symbol: '䷟', name: 'Persevering', chinese: '恆', pinyin: 'Héng', meaning: 'Duration' },
  { number: 33, symbol: '䷠', name: 'Retiring', chinese: '遯', pinyin: 'Dùn', meaning: 'Retreat' },
  { number: 34, symbol: '䷡', name: 'Great Invigorating', chinese: '大壯', pinyin: 'Dà Zhuàng', meaning: 'Great Power' },
  { number: 35, symbol: '䷢', name: 'Prospering', chinese: '晉', pinyin: 'Jìn', meaning: 'Progress' },
  { number: 36, symbol: '䷣', name: 'Darkening of the Light', chinese: '明夷', pinyin: 'Míng Yí', meaning: 'Darkening of the Light' },
  { number: 37, symbol: '䷤', name: 'Dwelling People', chinese: '家人', pinyin: 'Jiā Rén', meaning: 'The Family' },
  { number: 38, symbol: '䷥', name: 'Polarising', chinese: '睽', pinyin: 'Kuí', meaning: 'Opposition' },
  { number: 39, symbol: '䷦', name: 'Limping', chinese: '蹇', pinyin: 'Jiǎn', meaning: 'Obstruction' },
  { number: 40, symbol: '䷧', name: 'Taking-Apart', chinese: '解', pinyin: 'Xiè', meaning: 'Deliverance' },
  { number: 41, symbol: '䷨', name: 'Diminishing', chinese: '損', pinyin: 'Sǔn', meaning: 'Decrease' },
  { number: 42, symbol: '䷩', name: 'Augmenting', chinese: '益', pinyin: 'Yì', meaning: 'Increase' },
  { number: 43, symbol: '䷪', name: 'Parting', chinese: '夬', pinyin: 'Guài', meaning: 'Breakthrough' },
  { number: 44, symbol: '䷫', name: 'Coupling', chinese: '姤', pinyin: 'Gòu', meaning: 'Coming to Meet' },
  { number: 45, symbol: '䷬', name: 'Clustering', chinese: '萃', pinyin: 'Cuì', meaning: 'Gathering Together' },
  { number: 46, symbol: '䷭', name: 'Ascending', chinese: '升', pinyin: 'Shēng', meaning: 'Pushing Upward' },
  { number: 47, symbol: '䷮', name: 'Confining', chinese: '困', pinyin: 'Kùn', meaning: 'Oppression' },
  { number: 48, symbol: '䷯', name: 'Welling', chinese: '井', pinyin: 'Jǐng', meaning: 'The Well' },
  { number: 49, symbol: '䷰', name: 'Skinning', chinese: '革', pinyin: 'Gé', meaning: 'Revolution' },
  { number: 50, symbol: '䷱', name: 'Holding', chinese: '鼎', pinyin: 'Dǐng', meaning: 'The Cauldron' },
  { number: 51, symbol: '䷲', name: 'Shake', chinese: '震', pinyin: 'Zhèn', meaning: 'The Arousing, Thunder' },
  { number: 52, symbol: '䷳', name: 'Bound', chinese: '艮', pinyin: 'Gèn', meaning: 'Keeping Still, Mountain' },
  { number: 53, symbol: '䷴', name: 'Infiltrating', chinese: '漸', pinyin: 'Jiàn', meaning: 'Development' },
  { number: 54, symbol: '䷵', name: 'Converting the Maiden', chinese: '歸妹', pinyin: 'Guī Mèi', meaning: 'The Marrying Maiden' },
  { number: 55, symbol: '䷶', name: 'Abounding', chinese: '豐', pinyin: 'Fēng', meaning: 'Abundance' },
  { number: 56, symbol: '䷷', name: 'Sojourning', chinese: '旅', pinyin: 'Lǚ', meaning: 'The Wanderer' },
  { number: 57, symbol: '䷸', name: 'Ground', chinese: '巽', pinyin: 'Xùn', meaning: 'The Gentle, Wind' },
  { number: 58, symbol: '䷹', name: 'Open', chinese: '兌', pinyin: 'Duì', meaning: 'The Joyous, Lake' },
  { number: 59, symbol: '䷺', name: 'Dispersing', chinese: '渙', pinyin: 'Huàn', meaning: 'Dispersion' },
  { number: 60, symbol: '䷻', name: 'Articulating', chinese: '節', pinyin: 'Jié', meaning: 'Limitation' },
  { number: 61, symbol: '䷼', name: 'Center Confirming', chinese: '中孚', pinyin: 'Zhōng Fú', meaning: 'Inner Truth' },
  { number: 62, symbol: '䷽', name: 'Small Exceeding', chinese: '小過', pinyin: 'Xiǎo Guò', meaning: 'Small Preponderance' },
  { number: 63, symbol: '䷾', name: 'Already Fording', chinese: '既濟', pinyin: 'Jì Jì', meaning: 'After Completion' },
  { number: 64, symbol: '䷿', name: 'Not-Yet Fording', chinese: '未濟', pinyin: 'Wèi Jì', meaning: 'Before Completion' },
] as const;

export const HEXAGRAMS_BY_NUMBER: Readonly<Record<number, Hexagram>> = Object.freeze(
  Object.fromEntries(HEXAGRAMS_64.map((hexagram) => [hexagram.number, hexagram])) as Record<number, Hexagram>,
);

export const getHexagram = (number: number): Hexagram | undefined => HEXAGRAMS_BY_NUMBER[number];
