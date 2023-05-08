class Veiculo {
  private _id: string;
  private _placa: string;
  private _km: number;
  private _modelo: string;

  constructor(id: string, km: number, placa: string, modelo: string) {
    this._id = id;
    this._km = km;
    this._placa = placa;
    this._modelo = modelo;
  }

  get id(): string {
    return this._id;
  }

  get km(): number {
    return this._km;
  }

  get placa(): string {
    return this._placa;
  }

  get modelo(): string {
    return this._modelo;
  }

  set km(value: number) {
    if (value <= this._km) {
      console.log('O Km deve ser maior que o atual');
      return;
    }
    this._km = value;
  }
}

class OrdemDeCombustivel {
  private _id: string;
  private _veiculo: Veiculo;
  private _quantidade: number;

  constructor(id: string, veiculo: Veiculo, quantidade: number) {
    this._id = id;
    this._veiculo = veiculo;
    this._quantidade = quantidade;
  }

  get id(): string {
    return this._id;
  }

  get veiculo(): Veiculo {
    return this._veiculo;
  }

  get quantidade(): number {
    return this._quantidade;
  }
}

class Empresa {
  private _veiculos: Veiculo[];
  private _ordensDeCombustivel: OrdemDeCombustivel[];

  constructor() {
    this._veiculos = [];
    this._ordensDeCombustivel = [];
  }

  adicionarVeiculo(veiculo: Veiculo): void {
    this._veiculos.push(veiculo);
  }

  listarVeiculos(): Veiculo[] {
    return this._veiculos;
  }

  emitirOrdemDeCombustivel(
    veiculoId: string,
    quantidade: number
  ): OrdemDeCombustivel | null {
    const veiculo = this._veiculos.find((v) => v.id === veiculoId);
    if (!veiculo) {
      alert(`Veículo com ID ${veiculoId} não encontrado.`);
      return null;
    }

    if (quantidade <= 0) {
      alert('A quantidade precisa ser maior que 0');
      return null;
    }

    const ordemDeCombustivel = new OrdemDeCombustivel(
      Math.random().toString(36).substring(7), // ID aleatório
      veiculo,
      quantidade
    );
    this._ordensDeCombustivel.push(ordemDeCombustivel);
    return ordemDeCombustivel;
  }

  listarOrdensDeCombustivel(): OrdemDeCombustivel[] {
    return this._ordensDeCombustivel;
  }
}

function menu() {
  return `Menu 
              1 - Nova ordem de combustível
              2 - Listar ordens de combustível
              3 - Novo veículo
              4 - Listar veículo
              Para sair digite qualquer coisa`;
}

const carraraTaxi = new Empresa();
const onix = new Veiculo('157', 0, 'AXK3F81', 'Onix');
carraraTaxi.adicionarVeiculo(onix);
carraraTaxi.emitirOrdemDeCombustivel('157', 12);

let desejaSair = false;

while (!desejaSair) {
  const opcao = Number(prompt(menu()));
  switch (opcao) {
    case 1:
      const idVeiculo = prompt('Informe o id do veículo');
      const qtCombustivel = Number(
        prompt('Informe a quantidade de combutível a ser liberada')
      );
      const ordem = carraraTaxi.emitirOrdemDeCombustivel(
        idVeiculo,
        qtCombustivel
      );
      if (ordem) alert('Ordem emitida com sucesso');
      break;
    case 2:
      const ordens = carraraTaxi
        .listarOrdensDeCombustivel()
        .map(
          ({ id, veiculo, quantidade }) =>
            `${veiculo.placa} -> ${quantidade} Litros`
        );
      alert(ordens.join('\n'));
      break;
    case 3:
      const id = prompt('Informe o id do veículo');
      const km = Number(prompt('Informe o km do veículo'));
      const placa = prompt('Informe a placa do veículo');
      const modelo = prompt('Informe o modelo do veículo');
      const veiculo = new Veiculo(id, km, placa, modelo);
      carraraTaxi.adicionarVeiculo(veiculo);
      alert('Veiculo criado com sucesso');
      break;

    case 4:
      const veiculos = carraraTaxi
        .listarVeiculos()
        .map(
          ({ placa, km, modelo }) => `${modelo} | ${placa} -> ${km} Km rodados`
        );
      alert(veiculos.join('\n'));
      break;
    default:
      console.log('Saindo do programa...');
      desejaSair = true;
  }
}
