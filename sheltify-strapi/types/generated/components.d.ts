import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleSectionAnimalCards extends Struct.ComponentSchema {
  collectionName: 'components_article_section_animal_cards';
  info: {
    description: '';
    displayName: 'Tier-Karten';
    icon: 'apps';
  };
  attributes: {
    animals: Schema.Attribute.Relation<'oneToMany', 'api::animal.animal'>;
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.DefaultTo<'nein'>;
    filteredAmount: Schema.Attribute.Integer;
    queryFilter: Schema.Attribute.String;
    text: Schema.Attribute.Blocks;
  };
}

export interface ArticleSectionButtonLink extends Struct.ComponentSchema {
  collectionName: 'components_article_section_button_links';
  info: {
    description: '';
    displayName: 'buttonLink';
    icon: 'exit';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.DefaultTo<'nein'>;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'call-to-action']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface ArticleSectionCounter extends Struct.ComponentSchema {
  collectionName: 'components_article_section_counters';
  info: {
    description: '';
    displayName: 'counter';
    icon: 'plus';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'nein'>;
    counter: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ArticleSectionHero extends Struct.ComponentSchema {
  collectionName: 'components_article_section_heroes';
  info: {
    description: '';
    displayName: 'Bild \u00FCber ganze Breite';
  };
  attributes: {
    hero: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ArticleSectionHtml extends Struct.ComponentSchema {
  collectionName: 'components_article_section_htmls';
  info: {
    description: '';
    displayName: 'html';
    icon: 'code';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'nein'>;
    html: Schema.Attribute.Text;
  };
}

export interface ArticleSectionImage extends Struct.ComponentSchema {
  collectionName: 'components_article_section_images';
  info: {
    description: '';
    displayName: 'Bild(er) oder Video';
    icon: 'picture';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.DefaultTo<'nein'>;
    gallery: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    images: Schema.Attribute.Media<'images' | 'videos', true>;
  };
}

export interface ArticleSectionNewsCards extends Struct.ComponentSchema {
  collectionName: 'components_article_section_news_cards';
  info: {
    description: '';
    displayName: 'NewsCards';
  };
  attributes: {
    amount: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 20;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.DefaultTo<'nein'>;
    type: Schema.Attribute.Enumeration<['news', 'blog']>;
  };
}

export interface ArticleSectionPaypalButton extends Struct.ComponentSchema {
  collectionName: 'components_article_section_paypal_buttons';
  info: {
    displayName: 'paypal-button';
    icon: 'handHeart';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'nein'>;
  };
}

export interface ArticleSectionRowStart extends Struct.ComponentSchema {
  collectionName: 'components_article_section_row_starts';
  info: {
    description: '';
    displayName: 'Spalten';
    icon: 'apps';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.DefaultTo<'nein'>;
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    textCentered: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ArticleSectionSectionStart extends Struct.ComponentSchema {
  collectionName: 'components_article_section_section_starts';
  info: {
    description: '';
    displayName: 'Abschnitts-Beginn';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.DefaultTo<'nein'>;
    title: Schema.Attribute.String;
  };
}

export interface ArticleSectionText extends Struct.ComponentSchema {
  collectionName: 'components_article_section_texts';
  info: {
    description: '';
    displayName: ' Text';
    icon: 'layer';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.DefaultTo<'nein'>;
    text: Schema.Attribute.Blocks;
  };
}

export interface ArticleSectionTextWithImageSection
  extends Struct.ComponentSchema {
  collectionName: 'components_article_section_text_with_image_sections';
  info: {
    description: '';
    displayName: ' Text mit Bild(ern) oder Video';
    icon: 'picture';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<['nein', 'gr\u00FCn', 'beige']> &
      Schema.Attribute.DefaultTo<'nein'>;
    gallery: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    imagePosition: Schema.Attribute.Enumeration<
      ['oben', 'rechts', 'links', 'unten']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'rechts'>;
    images: Schema.Attribute.Media<'images' | 'videos', true>;
    text: Schema.Attribute.Blocks;
  };
}

export interface SingleTypesSponsor extends Struct.ComponentSchema {
  collectionName: 'components_single_types_sponsors';
  info: {
    displayName: 'sponsor';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article-section.animal-cards': ArticleSectionAnimalCards;
      'article-section.button-link': ArticleSectionButtonLink;
      'article-section.counter': ArticleSectionCounter;
      'article-section.hero': ArticleSectionHero;
      'article-section.html': ArticleSectionHtml;
      'article-section.image': ArticleSectionImage;
      'article-section.news-cards': ArticleSectionNewsCards;
      'article-section.paypal-button': ArticleSectionPaypalButton;
      'article-section.row-start': ArticleSectionRowStart;
      'article-section.section-start': ArticleSectionSectionStart;
      'article-section.text': ArticleSectionText;
      'article-section.text-with-image-section': ArticleSectionTextWithImageSection;
      'single-types.sponsor': SingleTypesSponsor;
    }
  }
}
