import React, { useEffect } from 'react';
import { Card } from 'interfaces';
import styles from './CardDisplay.module.scss';
import { formatText } from './index';

interface Props {
  imagePath?: string,
  card: Card,
}

const PokemonCard: React.FC<Props> = ({ imagePath, card }) => {
  useEffect(() => {
    if(card.moves) {
      let highestCost = 0;
      card.moves.forEach((move) => {
        let totalAmount: number = 0;
        move.energyCost.forEach((energyCost) => totalAmount += energyCost.amount);
        if(totalAmount > highestCost) {
          highestCost = totalAmount;
        }
      });

      const moveNames: HTMLElement[] = document.querySelectorAll('.moveName') as unknown as HTMLElement[];
      const initialLeft = +styles.moveNameLeft.substr(0, styles.moveNameLeft.length - 1);
      moveNames.forEach((moveName) => {
        moveName.style.left = `${Math.max(initialLeft, initialLeft + ((highestCost - 4) * 7))}%`;
      });
    }
  }, [card.moves])

  return (
    <div className={`${styles.card} ${card.type?.hasWhiteText ? styles.whiteText : ''}`}>
      {card.backgroundImage && <img src={card.backgroundImage} className={styles.backgroundImage} alt='' />}
      <span className={`${styles.name} ${styles.namePokemon}`}>{formatText(card.name)}</span>
      <div className={styles.hitpointsWrapper}>
        <span className={styles.hitpointsHP}>HP</span>
        <span className={styles.hitpoints}>{card.hitpoints && card.hitpoints <= 999 ? card.hitpoints : 999}</span>
      </div>
      {(card.subtype?.hasPrevolve && card.prevolveName) &&
        <span className={styles.prevolveName}>{'Evolves from '}{formatText(card.prevolveName)}</span>
      }
      {(card.subtype?.hasPokedexEntry && card.pokedexEntry) &&
        <span className={styles.pokedexEntry}>{card.pokedexEntry}</span>
      }
      <div className={styles.movesWrapper}>
        {card.ability &&
          <div className={styles.ability}>
            <div className={styles.abilityNameWrapper}>
              <img className={styles.abilityIcon} src='/assets/icons_symbols/other/ability.png' alt='' />
              <span>{card.ability.name}</span>
            </div>
            <p className={styles.abilityText}>{card.ability.text}</p>
          </div>
        }
        {card.moves && (card.moves.map((move, i) =>
          <div className={i === 0 ? card.moves && card.moves.length > 1 ? styles.moveMultiple : styles.move : ''} key={i}>
            <div className={styles.moveNameWrapper}>
              <div className={styles.moveCost}>
                {move.energyCost.map((moveType) => {
                  const returnValue: JSX.Element[] = [];
                  for(let i = 0; i < moveType.amount; i++) {
                    returnValue.push(<img src={`/assets/icons_symbols/types/${moveType.type.shortName}_border.png`} className={styles.moveEnergy} alt='' key={i} />);
                  }
                  return returnValue;
                })}
              </div>
              <span className={`${styles.moveName} moveName`}>{move.name}</span>
              <span className={styles.moveDamage}>{move.damage}</span>
            </div>
            <p className={styles.moveText}>{formatText(move.text)}</p>
          </div>
        ))}
      </div>
      <div className={`${styles.typeBar} ${card.subtype?.hasWhiteTypeBarText ? styles.whiteText : ''}`}>
        {card.weaknessType &&
          <span className={styles.weakness}>
            <img className={styles.weaknessIcon} src={`/assets/icons_symbols/types/${card.weaknessType.shortName}.png`} alt='' />
            <span>×{card.weaknessAmount && card.weaknessAmount < 100 ? card.weaknessAmount : 99}</span>
          </span>
        }
        {card.resistanceType &&
          <span className={styles.resistance}>
            <img className={styles.resistanceIcon} src={`/assets/icons_symbols/types/${card.resistanceType.shortName}.png`} alt='' />
            <span>-{card.resistanceAmount && card.resistanceAmount < 100 ? card.resistanceAmount : 99}</span>
          </span>
        }
        <div className={styles.retreatCost}>
          {Array.from(Array(card.retreatCost >= 0 ? card.retreatCost : 0), (e, i) =>
            i < 5 && <img key={i} className={styles.retreatCostIcon} src='/assets/icons_symbols/types/Colorless.png' alt='' />
          )}
        </div>
      </div>
      {card.subtype?.hasDescription &&
        <div className={`${styles.descriptionWrapper} ${styles.descriptionWrapperPokemon}`}>
          <p className={styles.description}>{formatText(card.description)}</p>
        </div>
      }
      {card.illustrator && <span className={styles.illustrator}>{`Illus. ${card.illustrator}`}</span>}
      {card.set && <img src={`/assets/icons_symbols/sets/${card.set.number}_SetIcon_${card.set.shortName}.png`} alt={card.set.name} className={styles.setIcon} />}
      <img src={`/assets/icons_symbols/rotations/${card.rotation?.shortName}.png`} alt={card.rotation?.name} className={styles.rotation} />
      <span className={styles.setNumber}>
        {`${card.cardNumber || ''}${card.totalInSet ? `/${card.totalInSet}` : ''}`}
        {card.rarityIcon &&
          <img src={`/assets/icons_symbols/rarities/${card.rarityIcon.shortName}${card.type?.hasWhiteText ? '_white' : ''}.png`}
            alt={card.rarityIcon.name} className={styles.rarityIcon} />
        }
      </span>
      {card.imageLayer1 && <img src={card.imageLayer1} className={styles.imageLayer1} alt='' />}
      <img src={imagePath} className={styles.image} alt={card.name || ''} />
      {(card.subtype?.hasPrevolve && card.prevolveImage) &&
        <div className={styles.prevolveImageWrapper}>
          <img src={card.prevolveImage} className={styles.prevolveImage} alt='' />
        </div>
      }
      {card.imageLayer2 && <img src={card.imageLayer2} className={styles.imageLayer2} alt='' />}
    </div>
  )
}

export default PokemonCard;
