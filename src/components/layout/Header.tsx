import React, { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Monitor, Search, Menu } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { NAV_ITEMS, ROUTES } from '@/app/config/constants';
import { MobileMenu } from './MobileMenu';
import type { ThemeMode } from '@/types/theme';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.leftSection}>
            {/* Botão de Menu Hambúrguer (Visível em < 960px) */}
            <button
              ref={burgerButtonRef}
              type="button"
              className={styles.burgerButton}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={22} />
            </button>

            <Link to={ROUTES.HOME} className={styles.logoLink} aria-label="CineFoxy Página Inicial">
              <img src="/img/logo.png" alt="CineFoxy Logo" className={styles.logo} />
            </Link>

            {/* Navegação Horizontal Desktop (Visível em >= 960px) */}
            <nav className={styles.nav} aria-label="Navegação principal desktop">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className={styles.rightSection}>
            <Link
              to={ROUTES.SEARCH}
              className={styles.iconButton}
              aria-label="Abrir pesquisa global"
              title="Pesquisar"
            >
              <Search size={18} />
            </Link>

            {/* Seletor Acessível de Tema: Claro, Escuro e Sistema */}
            <div className={styles.themeSelector} role="radiogroup" aria-label="Opções de tema">
              <button
                type="button"
                className={`${styles.themeButton} ${theme === 'light' ? styles.activeTheme : ''}`}
                onClick={() => handleThemeChange('light')}
                role="radio"
                aria-checked={theme === 'light'}
                aria-label="Tema Claro"
                title="Tema Claro"
              >
                <Sun size={15} />
              </button>

              <button
                type="button"
                className={`${styles.themeButton} ${theme === 'dark' ? styles.activeTheme : ''}`}
                onClick={() => handleThemeChange('dark')}
                role="radio"
                aria-checked={theme === 'dark'}
                aria-label="Tema Escuro"
                title="Tema Escuro"
              >
                <Moon size={15} />
              </button>

              <button
                type="button"
                className={`${styles.themeButton} ${theme === 'system' ? styles.activeTheme : ''}`}
                onClick={() => handleThemeChange('system')}
                role="radio"
                aria-checked={theme === 'system'}
                aria-label="Tema do Sistema"
                title="Acompanhar Sistema"
              >
                <Monitor size={15} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer Móvel */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        triggerRef={burgerButtonRef}
      />
    </>
  );
};
