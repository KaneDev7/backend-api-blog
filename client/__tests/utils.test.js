import {} from 'jest'
import { describe, it } from 'node:test';


describe('troncText', () => {
    it('devrait retourner le texte inchangé si sa longueur est inférieure à la longueur spécifiée', () => {
      const texte = 'Ceci est un texte';
      const longueur = 20;
      expect(troncText(texte, longueur)).toBe(texte);
    });
  
    it('devrait tronquer le texte et ajouter des points de suspension si sa longueur est supérieure à la longueur spécifiée', () => {
      const texte = 'Ceci est un texte à tronquer';
      const longueur = 10;
      const texteAttendu = 'Ceci est u...';
      expect(troncText(texte, longueur)).toBe(texteAttendu);
    });
  
    it('devrait retourner une chaîne vide si le texte est vide', () => {
      const texte = '';
      const longueur = 10;
      expect(troncText(texte, longueur)).toBe('');
    });
  });