import React from 'react';
import { PosterColumn } from './PosterColumn';
import styles from './AnimatedPosterWall.module.css';

// Cartazes ilustrativos baseados no Genre Color System do CineFoxy
const POSTERS_COL_1 = [
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20fill%3D%22%231A1212%22%20width%3D%22300%22%20height%3D%22450%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22180%22%20r%3D%2270%22%20fill%3D%22%23EF5350%22%20opacity%3D%220.8%22%2F%3E%3Ctext%20fill%3D%22%23FFFFFF%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%22340%22%20text-anchor%3D%22middle%22%3EA%C3%87%C3%83O%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20fill%3D%22%2312151A%22%20width%3D%22300%22%20height%3D%22450%22%2F%3E%3Crect%20x%3D%2260%22%20y%3D%22110%22%20width%3D%22180%22%20height%3D%22130%22%20fill%3D%22%2336B7C8%22%20opacity%3D%220.75%22%20rx%3D%228%22%2F%3E%3Ctext%20fill%3D%22%23FFFFFF%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%22340%22%20text-anchor%3D%22middle%22%3EFIC%C3%87%C3%83O%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20fill%3D%22%23171318%22%20width%3D%22300%22%20height%3D%22450%22%2F%3E%3Cpolygon%20points%3D%22150%2C90%20220%2C230%2080%2C230%22%20fill%3D%22%23A16AC7%22%20opacity%3D%220.8%22%2F%3E%3Ctext%20fill%3D%22%23FFFFFF%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%22340%22%20text-anchor%3D%22middle%22%3ETERROR%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20fill%3D%22%231A1412%22%20width%3D%22300%22%20height%3D%22450%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22170%22%20r%3D%2260%22%20fill%3D%22%23FF5722%22%20opacity%3D%220.85%22%2F%3E%3Ctext%20fill%3D%22%23FFFFFF%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%22340%22%20text-anchor%3D%22middle%22%3ECINEFOXY%3C%2Ftext%3E%3C%2Fsvg%3E'
];

const POSTERS_COL_2 = [
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20fill%3D%22%23181512%22%20width%3D%22300%22%20height%3D%22450%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22170%22%20r%3D%2260%22%20fill%3D%22%23E58A39%22%20opacity%3D%220.85%22%2F%3E%3Ctext%20fill%3D%22%23FFFFFF%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%22340%22%20text-anchor%3D%22middle%22%3EAVENTURA%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20fill%3D%22%23141716%22%20width%3D%22300%22%20height%3D%22450%22%2F%3E%3Crect%20x%3D%2270%22%20y%3D%22110%22%20width%3D%22160%22%20height%3D%22120%22%20fill%3D%22%234CA77C%22%20opacity%3D%220.8%22%20rx%3D%228%22%2F%3E%3Ctext%20fill%3D%22%23FFFFFF%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%22340%22%20text-anchor%3D%22middle%22%3EANIMA%C3%87%C3%83O%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20fill%3D%22%23171316%22%20width%3D%22300%22%20height%3D%22450%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22170%22%20r%3D%2260%22%20fill%3D%22%23E879A9%22%20opacity%3D%220.8%22%2F%3E%3Ctext%20fill%3D%22%23FFFFFF%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%22340%22%20text-anchor%3D%22middle%22%3EROMANCE%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20fill%3D%22%2313161A%22%20width%3D%22300%22%20height%3D%22450%22%2F%3E%3Cpolygon%20points%3D%22150%2C90%20220%2C230%2080%2C230%22%20fill%3D%22%236684C6%22%20opacity%3D%220.85%22%2F%3E%3Ctext%20fill%3D%22%23FFFFFF%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%22340%22%20text-anchor%3D%22middle%22%3EDRAMA%3C%2Ftext%3E%3C%2Fsvg%3E'
];

export const AnimatedPosterWall: React.FC = () => {
  return (
    <div className={styles.wallContainer} aria-hidden="true">
      <div className={styles.columnsGrid}>
        {/* 6 colunas com durações e direções alternadas para movimento contínuo e orgânico */}
        <PosterColumn images={POSTERS_COL_1} direction="up" durationSeconds={36} />
        <PosterColumn images={POSTERS_COL_2} direction="down" durationSeconds={48} />
        <PosterColumn images={POSTERS_COL_1} direction="up" durationSeconds={42} />
        <PosterColumn images={POSTERS_COL_2} direction="down" durationSeconds={54} />
        <PosterColumn images={POSTERS_COL_1} direction="up" durationSeconds={38} />
        <PosterColumn images={POSTERS_COL_2} direction="down" durationSeconds={46} />
      </div>
      <div className={styles.vignetteOverlay} />
      <div className={styles.bottomFade} />
    </div>
  );
};
