import Lotto from '../src/Lotto.js';

describe('로또 클래스 예외 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  // TODO: 이 테스트가 통과할 수 있게 구현 코드 작성
  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  // 아래에 추가 테스트 작성 가능
  describe('로또 번호 범위 테스트', () => {
    test('로또 번호에 0 이하의 숫자가 있으면 예외가 발생한다.', () => {
      expect(() => {
        new Lotto([0, 1, 2, 3, 4, 5]);
      }).toThrow('[ERROR]');
    });

    test('로또 번호에 46 이상의 숫자가 있으면 예외가 발생한다.', () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 47]);
      }).toThrow('[ERROR]');
    });
  });
});

describe('로또 클래스 정렬 테스트', () => {
  test('로또 번호가 오름차순으로 정렬된다.', () => {
    const lotto = new Lotto([1, 26, 16, 18, 2, 8]);
    expect(lotto.getNumbers()).toStrictEqual([1, 2, 8, 16, 18, 26]);
  });
});