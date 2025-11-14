"use client";

import { useState, useEffect } from "react";
import { Heart, Sparkles, Calendar, BookHeart, Bell, Plus, X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

interface Activity {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

const intimacyTips = [
  {
    title: "Técnicas de Controle",
    description: "Pratique a técnica de parar-e-começar: quando sentir que está próximo, pare por 30 segundos, respire fundo e retome. Isso treina o controle e aumenta a duração.",
    icon: "⏱️",
    premium: false
  },
  {
    title: "Exercícios de Kegel",
    description: "Fortaleça o músculo PC (pubococcígeo) contraindo por 5 segundos e relaxando. Faça 3 séries de 10 repetições diariamente para melhor controle e orgasmos mais intensos.",
    icon: "💪",
    premium: false
  },
  {
    title: "Zonas Erógenas Dela",
    description: "Explore além do óbvio: pescoço, orelhas, parte interna das coxas, pés. Use toques leves e variados. Pergunte o que ela mais gosta - comunicação é essencial.",
    icon: "🔥",
    premium: false
  },
  {
    title: "Preliminares Prolongadas",
    description: "Dedique pelo menos 20-30 minutos às preliminares. Mulheres precisam de mais tempo para excitação completa. Beijos, carícias e atenção ao corpo todo fazem diferença.",
    icon: "💋",
    premium: true
  },
  {
    title: "Comunicação Durante",
    description: "Pergunte 'você gosta assim?' ou 'mais forte/suave?'. Feedback em tempo real garante que você está no caminho certo. Ela vai adorar sua atenção aos detalhes.",
    icon: "💬",
    premium: true
  },
  {
    title: "Variedade de Posições",
    description: "Experimente posições que estimulam o ponto G (ela por cima, de lado) e permitem contato visual. Variar mantém a excitação e descobre novos prazeres.",
    icon: "🎯",
    premium: true
  },
  {
    title: "Respiração Consciente",
    description: "Respire profundamente pelo nariz durante o ato. Isso oxigena o corpo, reduz ansiedade e ajuda a controlar a excitação. Sincronize a respiração com ela.",
    icon: "🌬️",
    premium: true
  },
  {
    title: "Foco no Prazer Dela",
    description: "Garanta que ela tenha orgasmo primeiro (oral, manual ou brinquedos). Sem pressão para você e ela fica mais relaxada e satisfeita. Generosidade é sexy.",
    icon: "✨",
    premium: true
  },
  {
    title: "Ambiente e Clima",
    description: "Crie atmosfera: luzes baixas, música suave, temperatura agradável. O ambiente certo aumenta o tesão e deixa ambos mais confortáveis e conectados.",
    icon: "🕯️",
    premium: true
  },
  {
    title: "Saúde e Energia",
    description: "Exercícios regulares, boa alimentação e sono adequado melhoram desempenho sexual. Evite álcool em excesso antes - prejudica ereção e controle.",
    icon: "🏃",
    premium: true
  }
];

const activities = [
  {
    title: "Massagem Sensual Completa",
    description: "Usem óleo de massagem e explorem o corpo todo do parceiro por 30 minutos, sem pressa. Descubram pontos sensíveis e criem antecipação.",
    category: "intimidade",
    premium: false
  },
  {
    title: "Jogo de Fantasias",
    description: "Compartilhem 3 fantasias cada um, sem julgamentos. Escolham uma para realizar juntos. Comunicação aberta sobre desejos fortalece a intimidade.",
    category: "conexão",
    premium: false
  },
  {
    title: "Noite Temática Romântica",
    description: "Escolham um tema (Paris, praia, spa) e criem o ambiente: comida, música, decoração. Vistam-se a caráter e divirtam-se com a experiência.",
    category: "romântico",
    premium: false
  },
  {
    title: "Desafio de Toques",
    description: "Durante uma semana, toquem-se de forma não-sexual 10 vezes por dia (abraços, beijos, carícias). Reconectem-se através do toque físico.",
    category: "intimidade",
    premium: true
  },
  {
    title: "Banho Sensorial",
    description: "Tomem banho juntos com velas, música e espumas aromáticas. Lavem um ao outro devagar, explorando cada parte do corpo com atenção.",
    category: "intimidade",
    premium: true
  },
  {
    title: "Sessão de Fotos Íntimas",
    description: "Tirem fotos sensuais um do outro (só para vocês). Isso aumenta a confiança, o desejo e cria memórias especiais do relacionamento.",
    category: "intimidade",
    premium: true
  },
  {
    title: "Jantar Afrodisíaco",
    description: "Preparem juntos um jantar com alimentos afrodisíacos: ostras, chocolate, morangos, vinho. Alimentem um ao outro e aproveitem a sensualidade.",
    category: "romântico",
    premium: true
  },
  {
    title: "Exploração com Vendas",
    description: "Usem uma venda nos olhos e explorem o corpo do parceiro apenas com toque, beijos e sussurros. A privação sensorial intensifica as sensações.",
    category: "intimidade",
    premium: true
  }
];

export default function CoupleApp() {
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [completedActivities, setCompletedActivities] = useState<Activity[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedJournal = localStorage.getItem("coupleJournal");
    const savedActivities = localStorage.getItem("completedActivities");
    const savedNotifications = localStorage.getItem("notificationsEnabled");
    const savedPremium = localStorage.getItem("isPremium");

    if (savedJournal) setJournal(JSON.parse(savedJournal));
    if (savedActivities) setCompletedActivities(JSON.parse(savedActivities));
    if (savedNotifications) setNotificationsEnabled(JSON.parse(savedNotifications));
    if (savedPremium) setIsPremium(JSON.parse(savedPremium));
  }, []);

  // Save journal to localStorage
  const saveJournalEntry = () => {
    if (!newEntry.trim()) {
      toast.error("Escreva algo antes de salvar!");
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR"),
      content: newEntry
    };

    const updatedJournal = [entry, ...journal];
    setJournal(updatedJournal);
    localStorage.setItem("coupleJournal", JSON.stringify(updatedJournal));
    setNewEntry("");
    toast.success("Reflexão salva com sucesso! 💕");
  };

  // Delete journal entry
  const deleteEntry = (id: string) => {
    const updatedJournal = journal.filter(entry => entry.id !== id);
    setJournal(updatedJournal);
    localStorage.setItem("coupleJournal", JSON.stringify(updatedJournal));
    toast.success("Reflexão removida");
  };

  // Complete activity
  const completeActivity = (activityTitle: string, isPremiumActivity: boolean) => {
    if (isPremiumActivity && !isPremium) {
      toast.error("Esta atividade é exclusiva para membros Premium");
      return;
    }

    const activity: Activity = {
      id: Date.now().toString(),
      title: activityTitle,
      completed: true,
      date: new Date().toLocaleDateString("pt-BR")
    };

    const updated = [activity, ...completedActivities];
    setCompletedActivities(updated);
    localStorage.setItem("completedActivities", JSON.stringify(updated));
    toast.success("Atividade concluída! 🎉");
  };

  // Toggle notifications
  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem("notificationsEnabled", JSON.stringify(newState));
    
    if (newState) {
      toast.success("Notificações ativadas! Você receberá lembretes diários 🔔");
    } else {
      toast.info("Notificações desativadas");
    }
  };

  // Handle Keoto payment
  const handlePremiumUpgrade = () => {
    // Redirect to Keoto payment page
    window.open("https://pay.keoto.app/conexao-a-dois-premium", "_blank");
    toast.info("Redirecionando para pagamento seguro via Keoto...");
  };

  // Simulate premium activation (in real app, this would be triggered by payment confirmation)
  const activatePremium = () => {
    setIsPremium(true);
    localStorage.setItem("isPremium", JSON.stringify(true));
    toast.success("🎉 Premium ativado! Aproveite todo o conteúdo exclusivo!");
  };

  const freeTips = intimacyTips.filter(tip => !tip.premium);
  const premiumTips = intimacyTips.filter(tip => tip.premium);
  const freeActivities = activities.filter(activity => !activity.premium);
  const premiumActivities = activities.filter(activity => activity.premium);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 fill-white" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Conexão a Dois</h1>
                <p className="text-rose-100 text-sm md:text-base">Fortalecendo laços, melhorando a intimidade</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={notificationsEnabled ? "secondary" : "outline"}
                size="sm"
                onClick={toggleNotifications}
                className="gap-2"
              >
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {notificationsEnabled ? "Ativado" : "Ativar"}
                </span>
              </Button>
              {!isPremium && (
                <Button
                  onClick={handlePremiumUpgrade}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold gap-2"
                  size="sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Premium</span>
                </Button>
              )}
              {isPremium && (
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Premium</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Premium Banner */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white py-4 px-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <div>
                <p className="font-bold">Desbloqueie Conteúdo Premium</p>
                <p className="text-sm text-amber-100">7 dicas avançadas + 5 atividades exclusivas por apenas R$ 29,90</p>
              </div>
            </div>
            <Button
              onClick={handlePremiumUpgrade}
              className="bg-white text-orange-600 hover:bg-amber-50 font-bold"
            >
              Assinar Agora
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="tips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-md">
            <TabsTrigger value="tips" className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Dicas</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Atividades</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="gap-2">
              <BookHeart className="w-4 h-4" />
              <span className="hidden sm:inline">Diário</span>
            </TabsTrigger>
          </TabsList>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-rose-900 mb-2">
                Dicas para Melhorar na Cama
              </h2>
              <p className="text-rose-700">Técnicas práticas para durar mais, dar mais prazer e satisfazê-la completamente</p>
            </div>

            {/* Free Tips */}
            <div>
              <h3 className="text-xl font-bold text-rose-900 mb-4">Dicas Gratuitas</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {freeTips.map((tip, index) => (
                  <Card 
                    key={index} 
                    className="bg-white/90 backdrop-blur-sm border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <CardHeader>
                      <div className="text-4xl mb-2">{tip.icon}</div>
                      <CardTitle className="text-rose-900">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-rose-700 leading-relaxed">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Premium Tips */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-rose-900">Dicas Premium</h3>
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Premium
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {premiumTips.map((tip, index) => (
                  <Card 
                    key={index} 
                    className={`backdrop-blur-sm border-amber-300 transition-all duration-300 ${
                      isPremium 
                        ? "bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl hover:scale-105" 
                        : "bg-white/40 relative overflow-hidden"
                    }`}
                  >
                    {!isPremium && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="text-center">
                          <Lock className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                          <p className="text-sm font-bold text-amber-900">Premium</p>
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      <div className="text-4xl mb-2">{tip.icon}</div>
                      <CardTitle className="text-rose-900">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`leading-relaxed ${isPremium ? "text-rose-700" : "text-rose-400 blur-sm"}`}>
                        {tip.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-rose-900 mb-2">
                Atividades para Fazer Juntos
              </h2>
              <p className="text-rose-700">Experiências que fortalecem a conexão e aumentam a intimidade</p>
            </div>

            {/* Free Activities */}
            <div>
              <h3 className="text-xl font-bold text-rose-900 mb-4">Atividades Gratuitas</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {freeActivities.map((activity, index) => (
                  <Card 
                    key={index}
                    className="bg-white/90 backdrop-blur-sm border-rose-200 hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-rose-900">{activity.title}</CardTitle>
                          <CardDescription className="mt-2 text-rose-600">
                            {activity.description}
                          </CardDescription>
                        </div>
                        <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                          {activity.category}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => completeActivity(activity.title, false)}
                        className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Marcar como Concluída
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Premium Activities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-rose-900">Atividades Premium</h3>
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Premium
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {premiumActivities.map((activity, index) => (
                  <Card 
                    key={index}
                    className={`backdrop-blur-sm border-amber-300 transition-all duration-300 ${
                      isPremium 
                        ? "bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg" 
                        : "bg-white/40 relative overflow-hidden"
                    }`}
                  >
                    {!isPremium && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="text-center">
                          <Lock className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                          <p className="text-sm font-bold text-amber-900">Premium</p>
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-rose-900">{activity.title}</CardTitle>
                          <CardDescription className={`mt-2 ${isPremium ? "text-rose-600" : "text-rose-400 blur-sm"}`}>
                            {activity.description}
                          </CardDescription>
                        </div>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          {activity.category}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => completeActivity(activity.title, true)}
                        disabled={!isPremium}
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 disabled:opacity-50"
                      >
                        {isPremium ? (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Marcar como Concluída
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Desbloquear
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Completed Activities */}
            {completedActivities.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-rose-900 mb-4">
                  Atividades Concluídas ({completedActivities.length})
                </h3>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {completedActivities.slice(0, 6).map((activity) => (
                    <Card key={activity.id} className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-green-900">{activity.title}</p>
                            <p className="text-xs text-green-600 mt-1">{activity.date}</p>
                          </div>
                          <span className="text-2xl">✅</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Journal Tab */}
          <TabsContent value="journal" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-rose-900 mb-2">
                Diário do Relacionamento
              </h2>
              <p className="text-rose-700">Registre sentimentos e reflexões sobre sua jornada íntima</p>
            </div>

            {/* New Entry Form */}
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200">
              <CardHeader>
                <CardTitle className="text-rose-900">Nova Reflexão</CardTitle>
                <CardDescription>
                  Compartilhe seus pensamentos sobre a intimidade, o que funcionou ou o que gostaria de experimentar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Como foi a experiência de hoje? O que você aprendeu? O que gostaria de melhorar na próxima vez?"
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  className="min-h-32 border-rose-200 focus:border-rose-400"
                />
                <Button
                  onClick={saveJournalEntry}
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Salvar Reflexão
                </Button>
              </CardContent>
            </Card>

            {/* Journal Entries */}
            <div className="space-y-4">
              {journal.length === 0 ? (
                <Card className="bg-white/60 backdrop-blur-sm border-rose-200">
                  <CardContent className="pt-6 text-center">
                    <BookHeart className="w-12 h-12 mx-auto text-rose-300 mb-3" />
                    <p className="text-rose-600">
                      Ainda não há reflexões. Comece a registrar sua jornada íntima!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                journal.map((entry) => (
                  <Card 
                    key={entry.id}
                    className="bg-white/90 backdrop-blur-sm border-rose-200 hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm text-rose-600">{entry.date}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-rose-400 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-rose-900 leading-relaxed whitespace-pre-wrap">
                        {entry.content}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-rose-100">
            💕 Feito com amor para casais que querem fortalecer sua conexão íntima
          </p>
          <p className="text-sm text-rose-200 mt-2">
            Lembre-se: comunicação, respeito e carinho são a base de todo relacionamento saudável
          </p>
          <p className="text-xs text-rose-200 mt-3">
            Pagamentos processados com segurança via Keoto
          </p>
        </div>
      </footer>
    </div>
  );
}
