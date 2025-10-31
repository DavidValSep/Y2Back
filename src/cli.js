#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const Downloader = require('./downloader');
const path = require('path');

const program = new Command();

program
  .name('yoo2back')
  .description('Sistema de descarga y respaldo de contenido de YouTube')
  .version('1.0.0');

program
  .command('video <url>')
  .description('Descargar video de YouTube')
  .option('-o, --output <dir>', 'Directorio de salida', './downloads')
  .option('-q, --quality <quality>', 'Calidad del video (highest, lowest)', 'highest')
  .action(async (url, options) => {
    const spinner = ora('Descargando video...').start();
    
    try {
      const downloader = new Downloader(options.output);
      
      const result = await downloader.downloadVideo(url, {
        quality: options.quality,
        onProgress: (progress) => {
          spinner.text = `Descargando video... ${progress.percentage}%`;
        }
      });

      spinner.succeed(chalk.green(`✓ Video descargado: ${result.title}`));
      console.log(chalk.blue(`  Ubicación: ${result.path}`));
      console.log(chalk.blue(`  Tamaño: ${(result.size / 1024 / 1024).toFixed(2)} MB`));
    } catch (error) {
      spinner.fail(chalk.red(`✗ Error: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('audio <url>')
  .description('Descargar solo audio de YouTube')
  .option('-o, --output <dir>', 'Directorio de salida', './downloads')
  .action(async (url, options) => {
    const spinner = ora('Descargando audio...').start();
    
    try {
      const downloader = new Downloader(options.output);
      
      const result = await downloader.downloadAudio(url, {
        onProgress: (progress) => {
          spinner.text = `Descargando audio... ${progress.percentage}%`;
        }
      });

      spinner.succeed(chalk.green(`✓ Audio descargado: ${result.title}`));
      console.log(chalk.blue(`  Ubicación: ${result.path}`));
      console.log(chalk.blue(`  Tamaño: ${(result.size / 1024 / 1024).toFixed(2)} MB`));
    } catch (error) {
      spinner.fail(chalk.red(`✗ Error: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('thumbnail <url>')
  .description('Descargar miniatura del video')
  .option('-o, --output <dir>', 'Directorio de salida', './downloads')
  .action(async (url, options) => {
    const spinner = ora('Descargando miniatura...').start();
    
    try {
      const downloader = new Downloader(options.output);
      const result = await downloader.downloadThumbnail(url);

      spinner.succeed(chalk.green(`✓ Miniatura descargada: ${result.title}`));
      console.log(chalk.blue(`  Ubicación: ${result.path}`));
    } catch (error) {
      spinner.fail(chalk.red(`✗ Error: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('subtitles <url>')
  .description('Descargar subtítulos del video')
  .option('-o, --output <dir>', 'Directorio de salida', './downloads')
  .option('-l, --language <lang>', 'Código de idioma (es, en, etc)', 'es')
  .action(async (url, options) => {
    const spinner = ora('Descargando subtítulos...').start();
    
    try {
      const downloader = new Downloader(options.output);
      const result = await downloader.downloadSubtitles(url, {
        language: options.language
      });

      spinner.succeed(chalk.green(`✓ Subtítulos descargados: ${result.title}`));
      console.log(chalk.blue(`  Ubicación: ${result.path}`));
      console.log(chalk.blue(`  Idioma: ${result.language}`));
    } catch (error) {
      spinner.fail(chalk.red(`✗ Error: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('info <url>')
  .description('Obtener información del video')
  .action(async (url) => {
    const spinner = ora('Obteniendo información...').start();
    
    try {
      const downloader = new Downloader();
      const info = await downloader.getVideoInfo(url);

      spinner.succeed(chalk.green('✓ Información obtenida'));
      console.log(chalk.bold('\nDetalles del video:'));
      console.log(chalk.blue(`  Título: ${info.title}`));
      console.log(chalk.blue(`  Autor: ${info.author}`));
      console.log(chalk.blue(`  Duración: ${Math.floor(info.duration / 60)}:${info.duration % 60} min`));
      console.log(chalk.blue(`  Miniatura: ${info.thumbnail}`));
    } catch (error) {
      spinner.fail(chalk.red(`✗ Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
