import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '@/app/config/constants';
import styles from './MobileMenu.module.css';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, triggerRef }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Bloqueio de rolagem do body quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Transfere o foco para o botão fechar para acessibilidade imediata
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Listener para fechar no Escape e gerenciar retorno do foco
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        triggerRef?.current?.focus();
      }

      // Focus trap simplificado
      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  const handleLinkClick = () => {
    onClose();
    triggerRef?.current?.focus();
  };

  return (
    <>
      {/* Backdrop com fechamento por clique fora */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={() => {
          onClose();
          triggerRef?.current?.focus();
        }}
        aria-hidden={!isOpen}
      />

      {/* Painel Lateral com semântica de diálogo modal */}
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de Navegação Principal"
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <img src="/img/logo.png" alt="CineFoxy" className={styles.logo} />
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={() => {
              onClose();
              triggerRef?.current?.focus();
            }}
            aria-label="Fechar menu de navegação"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Navegação móvel">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
                  }
                  onClick={handleLinkClick}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
