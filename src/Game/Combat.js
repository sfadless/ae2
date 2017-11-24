export default class Combat {
    attack(attacker, defender) {
        const power = attacker.getAttackPower();
        const defence = defender.getDefence();

        attacker.preAttack(defender);
        defender.preAttacked(attacker);

        attacker.postAttack(defender);
        defender.postAttacked(attacker);
    }
}