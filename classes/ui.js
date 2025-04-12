class UI {
  constructor() {
    this.playerisat = 0; //Track where the player is in the UI or game.  //0 == Game Menu.
    this.language = 0; //0 == English  //1 == Arabic.
    this.animation_in_progress = 0; //Check if there is an animation in progress.
    this.time = 0; //For transition animations.
    this.fade = 255;
    this.restarted = 0;
  }

  //BACKGROUNDS

  gameplay_bars() {
    push();
    gameplay_hud.resize(width, height); //Alwayds do this for each element.
    image(gameplay_hud, 0, 0);
    pop();
  }

  side_bars() {
    push();
    /* fill(0); */

    main_hud.resize(width, height); //Alwayds do this for each element.
    image(main_hud, 0, 0);

    //Left black bar.
    /*     rect(
      this.position.x * 0.0,
      this.position.y * 0.0,
      this.position.x * 0.2,
      this.position.y * 1
    );

    //Right black bar.
    rect(
      this.position.x * 0.8,
      this.position.y * 0.0,
      this.position.x * 1,
      this.position.y * 1
    ); */
    pop();
  }

  //------SELECTIONS------

  //Player is at 0.
  languageSelection() {
    //-------- Background ------------
    /*     push();
    fill(255);
    rect(width * 0.2, height * 0, width * 0.6, height * 1);
    pop(); */

    this.side_bars();

    push();
    language_selection_menu.resize(width, height); //Alwayds do this for each element.
    image(language_selection_menu, 0, 0);
    pop();

    //-------- Language selection ------------

    //Text
    push();
    fill(0);
    textSize(width * 0.05);
    text("Select language", width * 0.325, height * 0.15);
    pop();

    //English
    /*     push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.3, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop(); */

    push();
    fill(255);
    textSize(width * 0.03);
    text("English", width * 0.45, height * 0.42);
    pop();

    //Arabic
    /*     push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.63, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop(); */

    push();
    textFont(font_arabic);
    fill(255);
    textSize(width * 0.02);

    //Process the Arabic language properly.
    let reshaped_text = ArabicReshaper.convertArabic("عربي");
    let display_text = reshaped_text.split("").reverse().join("");
    text(display_text, width * 0.475, height * 0.74);

    pop();
  }

  //Player is at 1.
  startMenu() {
    //-------- Background ------------
    /*     push();
    fill(255);
    rect(width * 0.2, height * 0, width * 0.6, height * 1);
    pop(); */

    this.side_bars();

    push();
    main_menu.resize(width, height); //Alwayds do this for each element.
    image(main_menu, 0, 0);
    pop();

    //-------- Language selection ------------

    //English
    /*     push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.3, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop(); */

    if (this.language == 0) {
      push();
      fill(255);
      textSize(width * 0.03);
      text("Start Game", width * 0.425, height * 0.42);
      pop();

      push();
      fill(255);
      textSize(width * 0.03);
      text("Credits", width * 0.45, height * 0.75);
      pop();

      push();
      fill(0);
      textSize(width * 0.015);
      text(
        "Developed for the Madar Tolerance Contest",
        width * 0.355,
        height * 0.98
      );
      pop();
    } else if (this.language == 1) {
      push();
      fill(255);
      textSize(width * 0.03);

      let reshaped_text = ArabicReshaper.convertArabic("ابدأ اللعبة");
      let display_text = reshaped_text.split("").reverse().join("");

      text(display_text, width * 0.435, height * 0.42);
      pop();

      push();
      fill(255);
      textSize(width * 0.03);

      reshaped_text = ArabicReshaper.convertArabic("الاعتمادات");
      display_text = reshaped_text.split("").reverse().join("");

      text(display_text, width * 0.43, height * 0.75);
      pop();

      push();
      fill(0);
      textSize(width * 0.015);
      reshaped_text = ArabicReshaper.convertArabic(
        "تم تطويره من أجل مسابقة مدار للتسامح"
      );
      display_text = reshaped_text.split("").reverse().join("");
      text(display_text, width * 0.365, height * 0.98);
      pop();
    }

    //Arabic
    /*     push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.63, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop(); */
  }

  //Player is at 3.
  theCredits() {
    //-------- Background ------------

    push();
    the_results.resize(width, height);
    image(the_results, 0, 0);
    pop();

    //-------- Credits ------------

    if (this.language == 0) {
      //Title
      push();
      fill(0);
      textSize(width * 0.05);
      text("Credits", width * 0.42, height * 0.15);
      pop();

      //Programming and art title
      push();
      fill(0);
      textSize(width * 0.02);
      text("Programming and art", width * 0.25, height * 0.25);
      pop();

      //Sounds title
      push();
      fill(0);
      textSize(width * 0.02);
      text("Sounds", width * 0.31, height * 0.4);
      pop();

      //Song obtained from
      push();
      fill(0);
      textSize(width * 0.014);
      text("Obtained from freesound.org", width * 0.25, height * 0.45);
      pop();

      //Music title
      push();
      fill(0);
      textSize(width * 0.02);
      text("Music", width * 0.65, height * 0.25);
      pop();

      push();
      fill(255);
      textSize(width * 0.02);
      text("Go to main menu", width * 0.425, height * 0.74);
      pop();
    } else if (this.language == 1) {
      //Title
      push();
      fill(0);
      let reshaped_text = ArabicReshaper.convertArabic("الاعتمادات");
      let display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.05);
      text(display_text, width * 0.38, height * 0.15);
      pop();

      //Programming and art title
      push();
      fill(0);
      reshaped_text = ArabicReshaper.convertArabic("البرمجة والفن");
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.02);
      text(display_text, width * 0.29, height * 0.25);
      pop();

      //Sounds title
      push();
      fill(0);
      reshaped_text = ArabicReshaper.convertArabic("الأصوات");
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.02);
      text(display_text, width * 0.313, height * 0.4);
      pop();

      //Sounds obtained from
      push();
      fill(0);
      reshaped_text = ArabicReshaper.convertArabic(
        "تم الحصول عليها من gro.dnuoseerf"
      );
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.014);
      text(display_text, width * 0.25, height * 0.45);
      pop();

      //Music title
      push();
      fill(0);
      reshaped_text = ArabicReshaper.convertArabic("الموسيقى");
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.02);
      text(display_text, width * 0.63, height * 0.25);
      pop();

      push();
      fill(255);
      reshaped_text = ArabicReshaper.convertArabic(
        "الانتقال إلى القائمة الرئيسية"
      );
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.014);
      text(display_text, width * 0.415, height * 0.74);
      pop();
    }

    //Programming and art
    push();
    fill(0);
    textSize(width * 0.014);
    text("Marcos Hernández (marcosni_gp1)", width * 0.24, height * 0.3);
    pop();

    //Music
    push();
    fill(0);
    textSize(width * 0.011);
    text(
      "Eric Skiff - Song Name - Underclocked -\n Available at http://EricSkiff.com/music",
      width * 0.57,
      height * 0.3
    );
    pop();

    push();
    fill(0);
    textSize(width * 0.011);
    text(
      "Kevin MacLeod - Song Name -\n     8bit Dungeon Level",
      width * 0.6,
      height * 0.4
    );
    pop();

    /*     push();
    fill(0);
    textSize(width * 0.014);
    text("------", width * 0.655, height * 0.4);
    pop(); */

    //----------------------

    //Exit button
    /*     push();
    fill(0, 0, 255);
    rect(width * 0.4, height * 0.63, width * 0.2, height * 0.2); //Parameters to use for condition.
    pop(); */
  }

  //Transition animation.
  transition() {
    if (ui_seconds != seconds) {
      this.time++;
      //console.log("AAAA");
    }

    if (this.time >= 0 && this.time < 3) {
      push();
      fill(0, 0, 0, this.fade);
      rect(width * 0.2, -1, width * 0.6, height * 1.1);
      pop();

      this.fade -= 2;
    }

    if (this.time == 3) {
      this.animation_in_progress = 0;
      this.time = 0;
      this.fade = 255;
      this.restarted = 0;
    }
  }

  //This is called after the player crashes, and the white effect animation finishes.
  theMessage() {
    //-------- Background ------------

    push();
    reflection.resize(width, height);
    image(reflection, 0, 0);
    pop();

    /*     push();
    fill(255);
    rect(width * 0.2, height * 0, width * 0.6, height * 1);
    pop();
 */
    //-------- Language selection ------------

    if (this.language == 0) {
      //Title??
      push();
      fill(0);
      textSize(width * 0.05);
      text("Message", width * 0.4, height * 0.15);
      pop();

      //Message
      push();
      fill(0);
      textSize(width * 0.018);
      text(
        "There are people who are different and need us to adapt\nthe world to them; we can not assume that this world meets\nevery need. If we do not ignore this, we will be able to make\nthe first necessary steps. Which will help us have a world\nwhere every single one of us can coexist peacefully.",
        width * 0.265,
        height * 0.27
      );
      pop();

      push();
      fill(255);
      textSize(width * 0.02);
      text("Go to main menu", width * 0.425, height * 0.74);
      pop();
    } else if (this.language == 1) {
      //Title??
      push();
      fill(0);
      let reshaped_text = ArabicReshaper.convertArabic("الرسالة");
      let display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.05);
      text(display_text, width * 0.425, height * 0.15);
      pop();

      //Message
      push();
      fill(0);
      reshaped_text = ArabicReshaper.convertArabic(
        "هناك أناس مختلفون\nويحتاجون منا أن نكيّف العالم معهم؛\nلا يمكننا أن نفترض أن هذا العالم يلبي كل احتياجاتهم.\nفإذا لم نتجاهل ذلك،\nسنكون قادرين على اتخاذ الخطوات الأولى الضرورية\nالأمر الذي سيساعدنا في الحصول على عالم يتعايش فيه الجميع بسلام."
      );
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.017);
      text(display_text, width * 0.24, height * 0.3);
      pop();

      push();
      fill(255);
      reshaped_text = ArabicReshaper.convertArabic(
        "الانتقال إلى القائمة الرئيسية"
      );
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.0145);
      text(display_text, width * 0.415, height * 0.74);
      pop();
    }
  }

  results() {
    //-------- Background ------------
    push();
    the_results.resize(width, height);
    image(the_results, 0, 0);
    pop();

    /*     push();
    fill(255);
    rect(width * 0.2, height * 0, width * 0.6, height * 1);
    pop(); */

    //-------- Results ------------

    if (this.language == 0) {
      //Title
      push();
      fill(0);
      textSize(width * 0.05);
      text("Results", width * 0.42, height * 0.15);
      pop();

      ///Seconds title
      push();
      fill(0);
      textSize(width * 0.025);
      text("Seconds spent:", width * 0.42, height * 0.28);
      pop();

      ///Attempts title
      push();
      fill(0);
      textSize(width * 0.025);
      text("Attempts:", width * 0.45, height * 0.42);
      pop();

      push();
      fill(255);
      textSize(width * 0.03);
      text("Continue", width * 0.44, height * 0.75);
      pop();
    } else if (this.language == 1) {
      //Title
      push();
      fill(0);
      let reshaped_text = ArabicReshaper.convertArabic("النتائج");
      let display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.05);
      text(display_text, width * 0.43, height * 0.15);
      pop();

      ///Seconds title
      push();
      fill(0);
      reshaped_text = ArabicReshaper.convertArabic("الثواني المستهلكة");
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.025);
      text(display_text, width * 0.41, height * 0.28);
      pop();

      ///Attempts title
      push();
      fill(0);
      reshaped_text = ArabicReshaper.convertArabic("المحاولات");
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.025);
      text(display_text, width * 0.45, height * 0.41);
      pop();

      push();
      fill(255);
      reshaped_text = ArabicReshaper.convertArabic("تابع");
      display_text = reshaped_text.split("").reverse().join("");
      textSize(width * 0.03);
      text(display_text, width * 0.48, height * 0.75);
      pop();
    }

    //Actual seconds.
    push();
    fill(0);
    textSize(width * 0.023);
    text(time, width * 0.49, height * 0.32);
    pop();

    //Actual Attempts
    push();
    fill(0);
    textSize(width * 0.023);
    text(attempts, width * 0.49, height * 0.46);
    pop();
  }

  gameplay_info() {
    if (showing_results == 0) {
      if (this.language == 0) {
        ///Seconds title
        push();
        fill(255);
        textSize(width * 0.025);
        text("Seconds spent:", width * 0.825, height * 0.15);
        pop();

        ///Attempts title
        push();
        fill(255);
        textSize(width * 0.025);
        text("Attempts:", width * 0.85, height * 0.39);
        pop();

        //----- Controls (They vary depending on the character.) ----//
        push();
        fill(255);
        textSize(width * 0.023);
        text("Control keys:", width * 0.835, height * 0.63);
        pop();
      } else if (this.language == 1) {
        ///Seconds title
        push();
        fill(255);
        textSize(width * 0.02);
        let reshaped_text = ArabicReshaper.convertArabic("الثواني المستهلكة");
        let display_text = reshaped_text.split("").reverse().join("");
        text(display_text, width * 0.823, height * 0.15);
        pop();

        ///Attempts title
        push();
        fill(255);
        textSize(width * 0.022);
        reshaped_text = ArabicReshaper.convertArabic("المحاولات");
        display_text = reshaped_text.split("").reverse().join("");
        text(display_text, width * 0.85, height * 0.39);
        pop();

        //----- Controls (They vary depending on the character.) ----//
        push();
        fill(255);
        textSize(width * 0.021);
        reshaped_text = ArabicReshaper.convertArabic("مفاتيح التحكم:");
        display_text = reshaped_text.split("").reverse().join("");
        text(display_text, width * 0.835, height * 0.62);
        pop();
      }

      //Actual seconds.
      push();
      fill(255);
      textSize(width * 0.023);
      text(time, width * 0.89, height * 0.2);
      pop();

      ///Actual attempts
      push();
      fill(255);
      textSize(width * 0.023);
      text(attempts, width * 0.89, height * 0.44);
      pop();

      //How to restart?
      if (cinematic_scene == 2 || cinematic_scene == 5) {
        if (this.language == 0) {
          push();
          fill(255);
          textSize(width * 0.014);
          text("(Press R to restart.)", width * 0.84, height * 0.5);
          pop();
        } else if (this.language == 1) {
          push();
          fill(255);
          textSize(width * 0.012);
          let reshaped_text = ArabicReshaper.convertArabic(
            ")اضغط على R لإعادة التشغيل("
          );
          let display_text = reshaped_text.split("").reverse().join("");
          text(display_text, width * 0.82, height * 0.5);
          pop();
        }
      }

      //Icons
      if (
        part == 1 ||
        (part == 2 && cinematic_scene == 0) ||
        (part == 3 && cinematic_scene == 3)
      ) {
        //push();
        /*         arrow_keys.resize(width, height); //Introduces a lot of lag.
        image(arrow_keys, 0, 0); */

        //pop();

        //Left arrow
        push();
        fill(30);
        rect(width * 0.83, height * 0.66, width * 0.05, height * 0.1);
        pop();

        push();
        fill(255);
        textSize(width * 0.032);
        text("<-", width * 0.838, height * 0.72);
        pop();

        //Right arrow
        push();
        fill(30);
        rect(width * 0.92, height * 0.66, width * 0.05, height * 0.1);
        pop();

        push();
        fill(255);
        textSize(width * 0.032);
        text("->", width * 0.93, height * 0.72);
        pop();
      } else if (cinematic_scene == 1 || cinematic_scene == 4) {
        push();
        fill(255);
        textSize(width * 0.03);
        text("????", width * 0.869, height * 0.7);
        pop();
      } else if (cinematic_scene == 2 || cinematic_scene == 5) {
        //Spacebar
        /* push(); */
        //Introduces a lot of lag.
        /*         spacebar.resize(width, height);
        image(spacebar, 0, 0); */
        /*  pop(); */

        push();
        fill(30);
        rect(width * 0.82, height * 0.66, width * 0.155, height * 0.1);
        pop();

        push();
        fill(255);
        textSize(width * 0.02);
        text("SPACEBAR", width * 0.85, height * 0.72);
        pop();

        if (this.language == 0) {
          push();
          fill(255);
          textSize(width * 0.01);
          text(
            "Tip: The jetpack is a bit... broken",
            width * 0.825,
            height * 0.79
          );
          pop();
        } else if (this.language == 1) {
          push();
          fill(255);
          textSize(width * 0.01);
          let reshaped_text = ArabicReshaper.convertArabic(
            "نصيحة: حقيبة الطائرة النفاثة مكسورة قليلاً."
          );
          let display_text = reshaped_text.split("").reverse().join("");
          text(display_text, width * 0.809, height * 0.79);
          pop();
        }
      }
    }
  }
}
