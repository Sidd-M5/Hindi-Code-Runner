// User authentication state
// let isLoggedIn = false;
// let currentUser = null;

// Topics content
const topics = {
    intro: {
        title: "कोडिंग की शुरुआत",
        icon: "fas fa-play-circle",
        content: `
          <div class="content-card">
            <h1 class="content-title">
              <i class="fas fa-rocket"></i>
              कोडिंग क्या है?
            </h1>
            <p class="content-subtitle">
              कोडिंग का मतलब है कंप्यूटर से बात करना। जैसे आप किसी दोस्त से हिंदी में बात करते हैं, वैसे ही कंप्यूटर से प्रोग्रामिंग भाषा में बात कर सकते हैं।
            </p>
            
            <div class="alert-custom alert-info">
              <i class="fas fa-lightbulb"></i>
              <strong>मज़ेदार तथ्य:</strong> दुनिया का पहला कंप्यूटर प्रोग्राम 1843 में Ada Lovelace द्वारा लिखा गया था!
            </div>

            <h3 style="color: var(--primary-color); margin-top: 2rem;">
              <i class="fas fa-laptop-code"></i>
              आपका पहला प्रोग्राम
            </h3>
            
            <div class="code-container">
              <div class="code-header">
                <div class="language-tag">
                  <i class="fab fa-python"></i>
                  Python - हिंदी कोड
                </div>
                <button class="copy-btn" onclick="copyToClipboard(this)">
                  <i class="fas fa-copy"></i>
                  कॉपी करें
                </button>
              </div>
              <pre><code><span class="keyword">छापें</span>(<span class="string">"🙏 नमस्ते दुनिया! मैं कोडिंग सीख रहा हूँ!"</span>)</code></pre>
            </div>
            
            <div class="output">
              🙏 नमस्ते दुनिया! मैं कोडिंग सीख रहा हूँ!
            </div>
            
            <div class="interactive-demo" onclick="showInteractiveDemo()">
              <i class="fas fa-play-circle" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
              <h4 style="color: var(--primary-color);">लाइव डेमो देखें</h4>
              <p style="color: var(--text-secondary); margin: 0;">इस कोड को चलाकर देखें कि यह कैसे काम करता है!</p>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/runner" class="btn-try" onclick="redirectToEditor()">
                <i class="fas fa-code"></i>
                खुद कोड लिखकर आज़माएं
              </a>
            </div>
          </div>
        `
    },
    print: {
        title: "छापें (Print)",
        icon: "fas fa-print",
        content: `
          <div class="content-card">
            <h1 class="content-title">
              <i class="fas fa-print"></i>
              छापें (Print Statement)
            </h1>
            <p class="content-subtitle">
              स्क्रीन पर कुछ भी दिखाने के लिए <code>छापें</code> का उपयोग करते हैं। यह प्रोग्रामिंग की सबसे बुनियादी और महत्वपूर्ण कमांड है।
            </p>
            
            <div class="row">
              <div class="col-lg-6 mb-4">
                <h4 style="color: var(--primary-color);">
                  <i class="fas fa-text-width"></i>
                  सामान्य टेक्स्ट छापना
                </h4>
                <div class="code-container">
                  <div class="code-header">
                    <div class="language-tag">उदाहरण 1</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
                  <pre><code><span class="keyword">छापें</span>(<span class="string">"मैं हिंदी में कोड लिख रहा हूँ"</span>)
<span class="keyword">छापें</span>(<span class="string">"यह बहुत मज़ेदार है!"</span>)</code></pre>
                </div>
                <div class="output">
                  मैं हिंदी में कोड लिख रहा हूँ<br>
                  यह बहुत मज़ेदार है!
                </div>
              </div>
              
              <div class="col-lg-6 mb-4">
                <h4 style="color: var(--primary-color);">
                  <i class="fas fa-calculator"></i>
                  संख्याएं छापना
                </h4>
                <div class="code-container">
                  <div class="code-header">
                    <div class="language-tag">उदाहरण 2</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
                  <pre><code><span class="keyword">छापें</span>(<span class="number">123</span>)
<span class="keyword">छापें</span>(<span class="number">45.67</span>)
<span class="keyword">छापें</span>(<span class="number">10 + 5</span>)</code></pre>
                </div>
                <div class="output">
                  123<br>
                  45.67<br>
                  15
                </div>
              </div>
            </div>
            
            <div class="alert-custom alert-warning">
              <i class="fas fa-exclamation-circle"></i>
              <strong>याद रखें:</strong> टेक्स्ट को हमेशा उद्धरण चिह्नों (" ") में लिखें!
            </div>
            
            <div class="interactive-demo" onclick="showInteractiveDemo()">
              <i class="fas fa-play-circle" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
              <h4 style="color: var(--primary-color);">अलग-अलग चीजें छापकर देखें!</h4>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/runner" class="btn-try" onclick="redirectToEditor()">
                <i class="fas fa-keyboard"></i>
                अपना संदेश छापें
              </a>
            </div>
          </div>
        `
    },
    variables: {
        title: "चर (Variables)",
        icon: "fas fa-box",
        content: `
    <div class="card">
      <h1 class="content-title"><i class="fas fa-box"></i>चर (Variables) – उदाहरण 1</h1>
      <div class="code-container">
                  <div class="code-header">
                    <div class="language-tag">उदाहरण 1</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
        <pre><code>
संख्या = 5
परिणाम = संख्या * 2
छापें("उत्तर:", परिणाम)
        </code></pre>
      </div>
      <div class="output">
        <strong>Output:</strong><br>
        उत्तर: 10
      </div>
      <p><strong>व्याख्या:</strong> यहाँ एक संख्या को चर में रखा गया और उसे 2 से गुणा करके आउटपुट निकाला।</p>
    </div>

    <div class="card">
      <h1 class="content-title"><i class="fas fa-box"></i>चर (Variables) – उदाहरण 2</h1>
      <div class="code-container">
        <div class="code-header">
                  <div class="language-tag">उदाहरण 2</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
        <pre><code>
पहला_नाम = "अमित"
अंतिम_नाम = "शर्मा"
पूरा_नाम = पहला_नाम + " " + अंतिम_नाम
छापें("पूरा नाम:", पूरा_नाम)
        </code></pre>
      </div>
      <div class="output">
        <strong>Output:</strong><br>
        पूरा नाम: अमित शर्मा
      </div>
      <p><strong>व्याख्या:</strong> दो स्ट्रिंग्स को जोड़कर पूरा नाम बनाया गया।</p>
    </div>

    <div class="card">
      <h1 class="content-title"><i class="fas fa-box"></i>चर (Variables) – उदाहरण 3</h1>
      <div class="code-container">
        <div class="code-header">
                  <div class="language-tag">उदाहरण 3</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
        <pre><code>
तापमान = 30
छापें("आज का तापमान:", तापमान, "डिग्री सेल्सियस")
        </code></pre>
      </div>
      <div class="output">
        <strong>Output:</strong><br>
        आज का तापमान: 30 डिग्री सेल्सियस
      </div>
      <p><strong>व्याख्या:</strong> संख्या को टेक्स्ट के साथ जोड़कर प्रदर्शित किया गया।</p>
    </div>

    <div class="card">
      <h1 class="content-title"><i class="fas fa-box"></i>चर (Variables) – उदाहरण 4</h1>
      <div class="code-container">
        <div class="code-header">
                  <div class="language-tag">उदाहरण 4</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
        <pre><code>
लॉगिन = सही
छापें("क्या यूज़र लॉगिन है?", लॉगिन)
        </code></pre>
      </div>
      <div class="output">
        <strong>Output:</strong><br>
        क्या यूज़र लॉगिन है? सही
      </div>
      <p><strong>व्याख्या:</strong> यहाँ बूलियन प्रकार का मान स्टोर किया गया है।</p>
    </div>

    <div class="card">
      <h1 class="content-title"><i class="fas fa-box"></i>चर (Variables) – उदाहरण 5</h1>
      <div class="code-container">
        <div class="code-header">
                  <div class="language-tag">उदाहरण 5</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
        <pre><code>
गिनती = 1
गिनती = गिनती + 4
छापें("कुल गिनती:", गिनती)
        </code></pre>
      </div>
      <div class="output">
        <strong>Output:</strong><br>
        कुल गिनती: 5
      </div>
      <p><strong>व्याख्या:</strong> चर के मान को अपडेट किया गया और फिर आउटपुट में दिखाया।</p>
      <div style="text-align: center; margin-top: 2rem;">
              <a href="/runner" class="btn-try" onclick="redirectToEditor()">
                <i class="fas fa-code"></i>
                खुद कोड लिखकर आज़माएं
              </a>
            </div>
    </div>
  `
    },

    // 🔹 DATA TYPES (डेटा प्रकार)
    datatypes: {
        icon: "fas fa-database",
        content: `
          <div class="card">
            <h1 class="content-title"><i class="fas fa-database"></i>डेटा प्रकार – उदाहरण 1 (पूर्णांक)</h1>
            <div class="code-container">
              <div class="code-header">
                    <div class="language-tag">उदाहरण 1</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
सेब = 10
छापें("सेब की संख्या:", सेब)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>सेब की संख्या: 10</div>
            <p><strong>व्याख्या:</strong> यह एक पूर्णांक डेटा प्रकार है।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-database"></i>डेटा प्रकार – उदाहरण 2 (दशमलव)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 2</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
मूल्य = 45.75
छापें("कुल मूल्य:", मूल्य)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>कुल मूल्य: 45.75</div>
            <p><strong>व्याख्या:</strong> यह दशमलव (float) डेटा प्रकार का उदाहरण है।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-database"></i>डेटा प्रकार – उदाहरण 3 (स्ट्रिंग)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 3</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
नाम = "नेहा"
छापें("नमस्ते", नाम)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>नमस्ते नेहा</div>
            <p><strong>व्याख्या:</strong> यह स्ट्रिंग प्रकार का मान है।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-database"></i>डेटा प्रकार – उदाहरण 4 (बूलियन)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 4</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
खेल = गलत
छापें("क्या खेल चालू है?", खेल)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>क्या खेल चालू है? गलत</div>
            <p><strong>व्याख्या:</strong> बूलियन डेटा केवल सही या गलत हो सकता है।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-database"></i>डेटा प्रकार – उदाहरण 5 (रिक्त)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 5</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
डेटा = रिक्त
छापें("डेटा:", डेटा)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>डेटा: रिक्त</div>
            <p><strong>व्याख्या:</strong> रिक्त का अर्थ है कि यहाँ कोई मान उपलब्ध नहीं है।</p>
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/runner" class="btn-try" onclick="redirectToEditor()">
                <i class="fas fa-code"></i>
                खुद कोड लिखकर आज़माएं
              </a>
            </div>
          </div>
        `
    },
    // 🔹 CONDITIONS (शर्तें)
    conditions: {
        icon: "fas fa-code-branch",
        content: `
          <div class="card">
            <h1 class="content-title"><i class="fas fa-code-branch"></i>शर्त – उदाहरण 1(If-Else)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 1</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
उम्र = 18
अगर उम्र >= 18:
    छापें("वयस्क")
अन्यथा:
    छापें("नाबालिग")
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>वयस्क</div>
            <p><strong>व्याख्या:</strong> If-Else का साधारण उपयोग।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-code-branch"></i>शर्त – उदाहरण 2(Even-Odd)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 2</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
संख्या = 5
अगर संख्या % 2 == 0:
    छापें("सम संख्या")
अन्यथा:
    छापें("विषम संख्या")
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>विषम संख्या</div>
            <p><strong>व्याख्या:</strong> Even-Odd चेक।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-code-branch"></i>शर्त – उदाहरण 3(Nested if-else)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 3</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
अंक = 75
अगर अंक >= 90:
    छापें("A ग्रेड")
अन्यथा_अगर अंक >= 60:
    छापें("B ग्रेड")
अन्यथा:
    छापें("C ग्रेड")
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>B ग्रेड</div>
            <p><strong>व्याख्या:</strong> Nested if-else का उपयोग।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-code-branch"></i>शर्त – उदाहरण 4</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 4</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
लॉगिन = सही
अगर लॉगिन:
    छापें("वेलकम")
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>वेलकम</div>
            <p><strong>व्याख्या:</strong> सिर्फ if का उपयोग।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-code-branch"></i>शर्त – उदाहरण 5</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 5</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
पासवर्ड = "1234"
अगर पासवर्ड == "1234":
    छापें("सही पासवर्ड")
अन्यथा:
    छापें("गलत पासवर्ड")
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>सही पासवर्ड</div>
            <p><strong>व्याख्या:</strong> पासवर्ड चेक करने का उदाहरण।</p>
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/runner" class="btn-try" onclick="redirectToEditor()">
                <i class="fas fa-code"></i>
                खुद कोड लिखकर आज़माएं
              </a>
            </div>
          </div>
        `
    },

    // 🔹 LOOPS (चक्र)
    loops: {
        icon: "fas fa-sync-alt",
        content: `
          <div class="card">
            <h1 class="content-title"><i class="fas fa-sync-alt"></i>लूप – उदाहरण 1(For loop)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 1</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
नाम_सूची = ["राम","सीता","मोहन"]
के_लिए नाम में नाम_सूची:
    छापें("नमस्ते", नाम)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>नमस्ते राम<br>नमस्ते सीता<br>नमस्ते मोहन</div>
            <p><strong>व्याख्या:</strong> साधारण for loop।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-sync-alt"></i>लूप – उदाहरण 2(While loop)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 2</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
गिनती = 1
जबतक गिनती <= 5:
    छापें("संख्या:", गिनती)
    गिनती = गिनती + 1
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>संख्या: 1<br>संख्या: 2<br>संख्या: 3<br>संख्या: 4<br>संख्या: 5</div>
            <p><strong>व्याख्या:</strong> while loop का उपयोग।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-sync-alt"></i>लूप – उदाहरण 3(Break)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 3</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
के_लिए i में [1,2,3,4,5]:
    अगर i == 3:
        रोकें
    छापें(i)

              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>1<br>2</div>
            <p><strong>व्याख्या:</strong> break का उपयोग।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-sync-alt"></i>लूप – उदाहरण 4(Continue)</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 4</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
के_लिए i में [1,2,3,4,5]:
  अगर i == 3:
      जारी_रखें
  छापें(i)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>1<br>2<br>4<br>5</div>
            <p><strong>व्याख्या:</strong> continue का उपयोग।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-sync-alt"></i>लूप – उदाहरण 5</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 5(Nested loop)</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
के_लिए i में [1,2,3]:
  के_लिए j में [1,2]:
      छापें(i,"x",j)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>1 x 1<br>1 x 2<br>2 x 1<br>2 x 2<br>3 x 1<br>3 x 2</div>
            <p><strong>व्याख्या:</strong> Nested loop।</p>
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/runner" class="btn-try" onclick="redirectToEditor()">
                <i class="fas fa-code"></i>
                खुद कोड लिखकर आज़माएं
              </a>
            </div>
          </div>
        `
    },

    // 🔹 FUNCTIONS (प्रकार्य)
    functions: {
        icon: "fas fa-function",
        content: `
          <div class="card">
            <h1 class="content-title"><i class="fas fa-function"></i>प्रकार्य – उदाहरण 1</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 1</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
परिभाषित नमस्ते(नाम):
    छापें("नमस्ते", नाम)

नमस्ते("राहुल")
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>नमस्ते राहुल</div>
            <p><strong>व्याख्या:</strong> साधारण फ़ंक्शन।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-function"></i>प्रकार्य – उदाहरण 2</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 2</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
परिभाषित जोड़(a, b):
    वापस_करें a + b

परिणाम = जोड़(5, 7)
छापें("योग:", परिणाम)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>योग: 12</div>
            <p><strong>व्याख्या:</strong> फ़ंक्शन से return।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-function"></i>प्रकार्य – उदाहरण 3</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 3</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
परिभाषित वर(x):
    वापस_करें x * x

छापें("25 का वर्ग:", वर(25))
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>25 का वर्ग: 625</div>
            <p><strong>व्याख्या:</strong> फंक्शन में गणितीय लॉजिक।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-function"></i>प्रकार्य – उदाहरण 4</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 4</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
परिभाषित संदेश():
    छापें("स्वागत है!")

संदेश()
संदेश()
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>स्वागत है!<br>स्वागत है!</div>
            <p><strong>व्याख्या:</strong> फंक्शन को कई बार कॉल किया।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-function"></i>प्रकार्य – उदाहरण 5</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण 5</div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
परिभाषित बड़ा(a, b):
  अगर a > b:
      वापस_करें a
  अन्यथा:
      वापस_करें b

छापें("बड़ा:", बड़ा(10, 20))
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>बड़ा: 20</div>
            <p><strong>व्याख्या:</strong> Comparison करने वाला function।</p>
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/runner" class="btn-try" onclick="redirectToEditor()">
                <i class="fas fa-code"></i>
                खुद कोड लिखकर आज़माएं
              </a>
            </div>
          </div>
        `
    },

    // 🔹 COLLECTIONS (संग्रह)
    collections: {
        icon: "fas fa-boxes",
        content: `
          <div class="card">
            <h1 class="content-title"><i class="fas fa-layer-group"></i>संग्रह – सूची</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण </div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
फल = ["सेब","केला","आम"]
छापें(फल)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>["सेब","केला","आम"]</div>
            <p><strong>व्याख्या:</strong> List का उपयोग।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-layer-group"></i>संग्रह – युग्म</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण </div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
बिंदु = (10,20)
छापें("X:", बिंदु[0])
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>X: 10</div>
            <p><strong>व्याख्या:</strong> Tuple का उपयोग।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-layer-group"></i>संग्रह – समुच्चय</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण </div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
संख्या = {1,2,2,3}
छापें(संख्या)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>{1,2,3}</div>
            <p><strong>व्याख्या:</strong> Set डुप्लीकेट हटाता है।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-layer-group"></i>संग्रह – शब्दकोश</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण </div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
विद्यार्थी = {"नाम":"रवि","उम्र":20}
छापें(विद्यार्थी["नाम"])
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>रवि</div>
            <p><strong>व्याख्या:</strong> Dictionary key-value का उपयोग।</p>
          </div>

          <div class="card">
            <h1 class="content-title"><i class="fas fa-layer-group"></i>संग्रह – नेस्टेड</h1>
            <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण </div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
              <pre><code>
डेटा = {
  "कक्षा": "10",
  "नाम": ["राम","श्याम"]
    }
छापें(डेटा)
              </code></pre>
            </div>
            <div class="output"><strong>Output:</strong><br>{"कक्षा":"10","नाम":["राम","श्याम"]}</div>
            <p><strong>व्याख्या:</strong> Nested collection।</p>
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/runner" class="btn-try" onclick="redirectToEditor()">
                <i class="fas fa-code"></i>
                खुद कोड लिखकर आज़माएं
              </a>
            </div>
          </div>
        `
    },


    oop: {
        title: "ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग",
        icon: "fas fa-user-astronaut",
        content: `
      <div class="content-card">
        <h1 class="content-title"><i class="fas fa-user-astronaut"></i> ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग</h1>
        <p class="content-subtitle">कक्षा (class) और वस्तु (object) से प्रोग्राम को वास्तविक दुनिया जैसा बनाया जाता है।</p>
        <div class="code-container">
              <div class="code-header">
                  <div class="language-tag">उदाहरण </div>
                    <button class="copy-btn" onclick="copyToClipboard(this)">
                      <i class="fas fa-copy"></i>
                      कॉपी
                    </button>
                  </div>
        
        <pre><code>वर्ग विद्यार्थी:
    परिभाषित आरंभ(स्वं, नाम):
        स्वं.नाम = नाम
    परिभाषित नमस्ते(स्वं):
        छापें("नमस्ते", स्वं.नाम)

वस्तु = विद्यार्थी("आरव")
वस्तु.नमस्ते()
</code></pre>
        
        <div class="output">नमस्ते आरव</div>
        <div style="text-align: center; margin-top: 2rem;">
              <a href="/runner" class="btn-try" onclick="redirectToEditor()">
                <i class="fas fa-code"></i>
                खुद कोड लिखकर आज़माएं
              </a>
            </div>
      </div>
      `
    }
};

// Theme helpers
function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    if (saved === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    updateThemeIcon(saved);
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    document.body.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(mode) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.querySelector('.icon-moon').style.display = mode === 'dark' ? 'none' : '';
    btn.querySelector('.icon-sun').style.display  = mode === 'dark' ? '' : 'none';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    showContent('intro', document.querySelector('.slink.active'));
});

// Sidebar toggle functionality (mobile only)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isOpen = sidebar.classList.toggle('show');

    // overlay
    let overlay = document.getElementById('sidebarOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'sidebarOverlay';
        overlay.className = 'sidebar-overlay';
        overlay.onclick = toggleSidebar;
        document.body.appendChild(overlay);
    }
    overlay.classList.toggle('show', isOpen);

    const icon = document.getElementById('menuBtn')?.querySelector('i');
    if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
}

// Content display functionality
function showContent(topicKey, element) {
    // Update active state
    document.querySelectorAll('.slink').forEach(link => link.classList.remove('active'));
    element.classList.add('active');

    // Update progress
    const progress = element.getAttribute('data-progress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    if (progressBar) progressBar.style.width = progress + '%';
    if (progressText) progressText.textContent = progress + '%';

    // Show content
    const topic = topics[topicKey];
    const contentEl = document.getElementById('content');
    if (topic) {
        contentEl.innerHTML = topic.content;
    } else {
        contentEl.innerHTML = `
          <div class="content-card">
            <h1 class="content-title">
              <i class="fas fa-tools"></i>
              जल्द आ रहा है...
            </h1>
            <p class="content-subtitle">यह सेक्शन अभी तैयार किया जा रहा है।</p>
          </div>`;
    }
    contentEl.scrollTop = 0;

    // Close sidebar on mobile
    if (window.innerWidth < 769) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('show')) toggleSidebar();
    }
}

// Interactive demo functionality
function showInteractiveDemo() {
    // This would show an interactive code runner
    alert('🚀 इंटरैक्टिव डेमो जल्द ही उपलब्ध होगा! अभी के लिए "खुद आज़माएं" बटन दबाएं।');
}

// Copy to clipboard functionality
function copyToClipboard(button) {
    const codeBlock = button.closest('.code-container').querySelector('code');
    const text = codeBlock.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> कॉपी हो गया!';
        button.style.background = 'rgba(16, 185, 129, 0.2)';

        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = '';
        }, 2000);
    }).catch(() => {
        alert('कॉपी नहीं हो सका। कृपया मैन्युअल रूप से कॉपी करें।');
    });
}


// Responsive sidebar handling
window.addEventListener('resize', function () {
    if (window.innerWidth >= 769) {
        // On desktop: ensure sidebar is always visible, close overlay
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        sidebar.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        const icon = document.getElementById('menuBtn')?.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
    }
});

function redirectToEditor() {
    if (isLoggedIn) {
        // ✅ Already logged in → open editor in new tab
        window.open("/runner", "_blank");
    } else {
        // ❌ Not logged in → send to login page
        alert("कृपया पहले लॉगिन करें!");
        window.location.href = "/login";
    }
}