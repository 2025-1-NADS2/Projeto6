using System;
class Evento
{
    public string Titulo { get; set; }
    public string Tipo { get; set; } // Atividade, Palestra, Workshop, Curso
    public DateTime Data { get; set; }
    public string Local { get; set; }
    public int Participantes { get; set; }
    public double Arrecadacao { get; set; }

    public Evento(string titulo, string tipo, DateTime data, string local, int participantes, double arrecadacao)
    {
        Titulo = titulo;
        Tipo = tipo;
        Data = data;
        Local = local;
        Participantes = participantes;
        Arrecadacao = arrecadacao;
    }
}