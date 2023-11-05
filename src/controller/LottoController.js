import { Random } from '@woowacourse/mission-utils';

import { LOTTO } from '../constants/setting.js';
import Lotto from '../Lotto.js';
import OutputView from '../views/Output.js';

class LottoController {
  #money;
  #lottos;
  #statistics;
  #totalRevenueRate;

  constructor(money) {
    this.#money = money;
    this.#lottos = [];
    this.#statistics = this.initLottoStatistics();
    this.#totalRevenueRate = 0;
  }

  initLottoStatistics() {
    return {
      match3: { match: 3, bonus: false, count: 0, prize: 5000 },
      match4: { match: 4, bonus: false, count: 0, prize: 50000 },
      match5: { match: 5, bonus: false, count: 0, prize: 1500000 },
      match5Bonus: { match: 5, bonus: true, count: 0, prize: 30000000 },
      match6: { match: 6, bonus: false, count: 0, prize: 2000000000 },
    };
  }

  purchaseLotto() {
    const lottoCount = this.#money / LOTTO.price;
    OutputView.printPurchaseMessage(lottoCount);

    for (let i = 0; i < lottoCount; i += 1) {
      const lotto = this.issueLotto();
      this.#lottos.push(lotto);
    }
  }

  showLottos() {
    this.#lottos.forEach(lotto => {
      const numbers = lotto.getNumbers();
      OutputView.printIssuedLottoNumbers(numbers);
    });
  }

  issueLotto() {
    const lottoNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
    const lotto = new Lotto(lottoNumbers);

    return lotto;
  }

  compareLottos(winningNumbers, bonusNumber) {
    this.#lottos.forEach(lotto => {
      const matchResult = this.matchLotto(lotto, winningNumbers, bonusNumber);

      this.updateLottoStatistics(matchResult);
    });
  }

  matchLotto(lotto, winningNumbers, bonusNumber) {
    const numbers = lotto.getNumbers();
    let count = 0;
    const bonus = this.includeBonusNumber(numbers, bonusNumber);

    numbers.forEach(number => {
      if (winningNumbers.includes(number)) count += 1;
    });

    return { count, bonus };
  }

  includeBonusNumber(numbers, bonusNumber) {
    return numbers.includes(bonusNumber);
  }

  updateLottoStatistics(matchResult) {
    if (matchResult.count < LOTTO.match3 && !matchResult.bonus) return;

    const key = this.determineStatisticsKey(matchResult);
    this.updateStatistics(key);
  }

  determineStatisticsKey({ count, bonus }) {
    if (count === LOTTO.match5 && bonus) {
      return 'match5Bonus';
    }

    if (bonus) {
      return `match${count + 1}`;
    }

    return `match${count}`;
  }

  updateStatistics(key) {
    if (this.#statistics[key]) {
      this.#statistics[key].count += 1;
    }
  }

  calculateRateOfReturn() {
    const matches = Object.values(this.#statistics);
    let totalRevenueMoney = 0;

    matches.forEach(({ count, prize }) => (totalRevenueMoney += count * prize));
    this.#totalRevenueRate = (totalRevenueMoney / this.#money) * 100;
  }
}

export default LottoController;
