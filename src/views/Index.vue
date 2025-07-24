<template>
  <div
    class="min-h-screen w-screen text-white"
    
  >
    <div class="w-full h-full max-w-[2000px] mx-auto flex flex-col md:flex-row gap-4 p-2 md:p-4">
      
      <div class="flex-1 flex flex-col">
        <div class="w-full flex-1 rounded-xl overflow-hidden shadow-2xl border border-amber-500/30 backdrop-blur-sm flex" style="min-height:calc(100vh - 2rem);">
          <iframe
            src="https://trade.polariumbroker.com/en/register?aff=760703&aff_model=revenue&afftrack=harveyia"
            class="w-full h-full min-h-screen md:min-h-0"
            title="Polarium Broker"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe>
        </div>
      </div>

      <div class="w-full md:w-[448px] md:flex-shrink-0">
        <div class="relative bg-gray-900/95 backdrop-blur-xl border-2 border-amber-400/50 rounded-xl shadow-2xl overflow-hidden h-full min-h-[calc(100vh-2rem)] flex flex-col justify-between">
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 rounded-xl"></div>
          <div class="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-amber-500/20 to-amber-400/20 rounded-xl blur-sm -z-10"></div>

            <div class="relative p-4 border-b border-amber-400/30">
            <div class="flex flex-col items-center justify-center mb-4 space-y-2">
              <div class="flex items-center space-x-3">
              <img src="@/assets/logo.png" alt="Logo" class="h-8 w-auto object-contain" />
              </div>
              <h1 class="text-center text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 tracking-wider mt-6">
              BEM-VINDO TRADER
              </h1>
            </div>
            </div>
          
          <!-- Responsivo: Adicione overflow-auto e ajuste padding -->
          <div class="flex-1 p-2 md:p-6 space-y-6 overflow-auto">
            <div class="space-y-3 relative z-10">
              <div>
                <label for="ativo" class="block text-sm font-medium text-amber-400/80 mb-1">Ativo</label>
                <select id="ativo" v-model="ativoSelecionado" class="w-full p-3 md:p-4 text-base rounded-lg bg-gray-800/50 border border-amber-400/20 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition">
                  <option disabled :value="null">Escolha um ativo...</option>
                  <option v-for="par in todosOsPares" :key="par" :value="par">{{ par }}</option>
                </select>
              </div>
              <div>
                <label for="expiracao" class="block text-sm font-medium text-amber-400/80 mb-1">Tempo de Expiração</label>
                <select id="expiracao" v-model="expiracaoSelecionada" class="w-full p-3 md:p-4 text-base rounded-lg bg-gray-800/50 border border-amber-400/20 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition">
                  <option disabled :value="null">Escolha um tempo...</option>
                  <option v-for="tempo in temposDeExpiracao" :key="tempo.value" :value="tempo.value">{{ tempo.label }}</option>
                </select>
              </div>
            </div>

            <div class="space-y-3 pt-2">
              <button
                @click="gerarSinal"
                :disabled="!ativoSelecionado || !expiracaoSelecionada || analisandoSinal || sinalEmAndamento"
                class="w-full relative group overflow-hidden rounded-xl border-2 border-amber-400/50 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-amber-500/20"
              >
                <div class="relative flex items-center justify-center py-4 md:py-5 px-6 md:px-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 mr-3 text-amber-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <span class="font-extrabold text-amber-400 tracking-wider text-lg">GERAR SINAL</span>
                </div>
              </button>
              
              <div v-if="analisandoSinal" class="w-full relative overflow-hidden rounded-lg border-2 border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-blue-600/20">
                <div class="relative flex items-center justify-center py-3 px-4 md:px-6">
                  <div class="animate-spin mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-blue-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <span class="font-bold text-blue-400 tracking-wider">ANALISANDO...</span>
                </div>
              </div>

              <div v-if="sinalEmAndamento" class="w-full relative overflow-hidden rounded-lg border-2 border-green-400/50 bg-gradient-to-r from-green-500/20 to-green-600/20">
                <div class="relative flex items-center justify-center py-3 px-4 md:px-6">
                  <div class="animate-pulse mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-green-400"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  </div>
                  <span class="font-bold text-green-400 tracking-wider">SINAL EM ANDAMENTO</span>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-gray-800/50 border border-amber-400/20 rounded-lg p-2 md:p-3">
                <div class="text-amber-400/80 text-sm font-medium mb-1">Horário de Expiração</div>
                <div class="text-amber-300 font-bold text-sm">{{ sinal.horario }}</div>
              </div>
              <div class="bg-gray-800/50 border border-amber-400/20 rounded-lg p-2 md:p-3">
                <div class="text-amber-400/80 text-sm font-medium mb-1">Análise</div>
                <div class="font-bold text-sm"
                  :class="sinal.direcao === 'CALL' ? 'text-green-400' : (sinal.direcao === 'PUT' ? 'text-red-500' : 'text-amber-300')">
                  {{ sinal.direcao === 'CALL' ? 'COMPRA' : (sinal.direcao === 'PUT' ? 'VENDA' : sinal.direcao) }}
                </div>
              </div>
              <div class="bg-gray-800/50 border border-amber-400/20 rounded-lg p-2 md:p-3">
                <div class="text-amber-400/80 text-sm font-medium mb-1">Proteção (Reentradas)</div>
                <div class="text-amber-300 font-bold text-sm">{{ sinal.gales }}</div>
              </div>
              <div class="bg-gray-800/50 border border-amber-400/20 rounded-lg p-2 md:p-3">
                <div class="text-amber-400/80 text-sm font-medium mb-1">Taxa de Assertividade</div>
                <div class="text-amber-300 font-bold text-sm">{{ sinal.assertividade }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'IndexView',
  data() {
    return {
      // Estados da UI
      sinalEmAndamento: false,
      analisandoSinal: false,
      sinalConfirmado: false,
      
      // Dados do Formulário
      ativoSelecionado: null,
      expiracaoSelecionada: null,

      // Dados do Sinal Gerado
      sinal: {
        par: '-',
        horario: '-',
        direcao: '-',
        gales: '-',
        assertividade: '-',
      },
      
      // Opções dos Seletores
      temposDeExpiracao: [
        { value: 'M1', label: '1 Minuto' },
        { value: 'M5', label: '5 Minutos' },
        { value: 'M15', label: '15 Minutos' },
        { value: 'M30', label: '30 Minutos' },
        { value: 'H1', label: '1 Hora' },
      ],
      todosOsPares: [
        // Pares OTC
        "EURUSD-OTC", "EURGBP-OTC", "USDCHF-OTC", "EURJPY-OTC", "GBPUSD-OTC", "GBPJPY-OTC", "AUDCAD-OTC", "AUDUSD-OTC", "USDCAD-OTC", "AUDJPY-OTC", "BTCUSD-OTC", "ETHUSD-OTC", "XAU/XAG-OTC", "GOOGLE-OTC", "AMAZON-OTC", "TESLA-OTC", "FACEBOOK-OTC", "SP500-OTC", "NASDAQ100-OTC", "USDBRL-OTC",
        // Pares Abertos
        "EURUSD", "EURGBP", "EURJPY", "USDJPY", "GBPJPY", "GBPUSD", "AUDCAD", "AUDJPY", "AUDUSD", "CADCHF", "EURAUD", "EURCAD", "EURCHF", "GBPAUD", "USDCAD", "GBPNZD", "NZDCAD", "BTCUSD"
      ]
    }
  },
  methods: {
    logToServer(level, message, data = null) {
      // O URL do seu backend. Em produção, pode ser um URL relativo.
      const logUrl = '/api/log';

      axios.post(logUrl, {
        level: level,       // ex: 'info', 'warn', 'error'
        message: message,   // A mensagem de log
        data: data          // Dados adicionais (opcional)
      }).catch(error => {
        // Log de erro no navegador se a API de log falhar
        console.error('Falha ao enviar log para o servidor:', error);
      });
    },
    gerarSinal() {
      if (!this.ativoSelecionado || !this.expiracaoSelecionada || this.sinalEmAndamento || this.analisandoSinal) return;

      this.logToServer('info', 'Tentativa de gerar sinal', {
          ativo: this.ativoSelecionado,
          expiracao: this.expiracaoSelecionada
      });
      
      this.resetarSinal();
      this.analisandoSinal = true;
      const tempoAnalise = 3000 + Math.random() * 2000;
      
      setTimeout(() => {
        this.analisandoSinal = false;
        this.sinalEmAndamento = true;
        this.sinalConfirmado = true;
        
        // --- LÓGICA DE CÁLCULO DE TEMPO CORRIGIDA ---
        const agora = new Date();
        const expiracao = this.expiracaoSelecionada;

        if (expiracao.startsWith('M')) {
          // Lógica para M1, M5, M15, M30
          const interval = parseInt(expiracao.substring(1)); // Pega o número (1, 5, 15, 30)
          const currentMinutes = agora.getMinutes();
          // Calcula quantos minutos faltam para o próximo múltiplo do intervalo
          const minutesToAdd = interval - (currentMinutes % interval);
          agora.setMinutes(currentMinutes + minutesToAdd);
        } else if (expiracao === 'H1') {
          // Lógica para H1
          agora.setHours(agora.getHours() + 1);
          agora.setMinutes(0);
        }
        // Zera os segundos e milissegundos para precisão no início da vela
        agora.setSeconds(0, 0);
        // --- FIM DA LÓGICA DE TEMPO ---

        const horarioFormatado = agora.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        const direcaoEscolhida = Math.random() < 0.5 ? 'CALL' : 'PUT';
        const taxaAssertividade = (Math.random() * (98 - 95) + 95).toFixed(2) + '%';
        
        this.sinal.par = this.ativoSelecionado;
        this.sinal.horario = horarioFormatado;
        this.sinal.direcao = direcaoEscolhida;
        this.sinal.gales = 2;
        this.sinal.assertividade = taxaAssertividade;

        this.logToServer('info', 'Sinal gerado com sucesso', {
            sinal: this.sinal
        });
        
        setTimeout(() => {
          this.sinalEmAndamento = false;
          this.resetarSinal();
        }, 120000);
        
      }, tempoAnalise);
    },
    
    resetarSinal() {
      this.sinalConfirmado = false;
      this.sinal.par = '-';
      this.sinal.horario = '-';
      this.sinal.direcao = '-';
      this.sinal.gales = '-';
      this.sinal.assertividade = '-';
    }
  }
}
</script>

<style scoped>
.border-3 {
    border-width: 3px;
}

/* Estilização para os seletores para combinar com o tema */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f59e0b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>