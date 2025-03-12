using System;
class Projeto
{
    public string Nome { get; set; }
    public string Status { get; set; } // Em andamento, Concluído
    public int Colaboradores { get; set; }

    public Projeto(string nome, string status, int colaboradores)
    {
        Nome = nome;
        Status = status;
        Colaboradores = colaboradores;
    }
}