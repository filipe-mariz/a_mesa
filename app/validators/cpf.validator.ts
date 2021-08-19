export default class Cpf {
  public async cpfValidator(cpf) {
    const replace = cpf.replace(/[^\d]+/g, '');
    const cpfToArray = replace.split('')

    const fisrtNumber = (
      (cpfToArray[0] * 10) +
      (cpfToArray[1] * 9) +
      (cpfToArray[2] * 8) +
      (cpfToArray[3] * 7) +
      (cpfToArray[4] * 6) +
      (cpfToArray[5] * 5) +
      (cpfToArray[6] * 4) +
      (cpfToArray[7] * 3) +
      (cpfToArray[8] * 2)
    )

    const restoFisrtNumber = fisrtNumber % 11
    if (restoFisrtNumber < 2) {
      if (cpfToArray[9] != 0) {
        console.log('CPF inválido')
        return false
      }
    } else {
      const result = 11 - restoFisrtNumber
      if (cpfToArray[9] != result) {
        console.log('CPF inválido')
        return false
      }
    }

    const secondNumber = (
      (cpfToArray[0] * 11) +
      (cpfToArray[1] * 10) +
      (cpfToArray[2] * 9) +
      (cpfToArray[3] * 8) +
      (cpfToArray[4] * 7) +
      (cpfToArray[5] * 6) +
      (cpfToArray[6] * 5) +
      (cpfToArray[7] * 4) +
      (cpfToArray[8] * 3) +
      (cpfToArray[9] * 2)
    )

    const restoSecondnumber = secondNumber % 11;
    if (restoSecondnumber < 2) {
      if (cpfToArray[10] != 0) {
        console.log('CPF inválido')
        return false
      }
    } else {
      const result = 11 - restoSecondnumber
      if (cpfToArray[10] != result) {
        console.log('CPF inválido')
        return false
      }
    }

    if (cpfToArray[11] == true) {
      return false
    }
  }
}
