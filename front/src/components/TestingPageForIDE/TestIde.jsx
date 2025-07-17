import "./TestIde.css";
import CodeEditor from "../CodeEditor/CodeEditor";

export default function TestIde() {
  return (
    <div className="testide-wrapper">
      <div className="testide-header">
        <h1 className="testide-title">Test IDE</h1>
        <p>
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Impedit quas laborum mollitia suscipit inventore beatae
          voluptate dolore doloribus dicta quasi, iusto quae esse
          ratione voluptates! Corrupti ad sed assumenda. Sed! <br />{" "}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Explicabo, at totam non quas, eius nobis deleniti cupiditate
          eveniet incidunt sapiente commodi quaerat consectetur id
          rerum modi eligendi ab a placeat.
          <br /> Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Omnis mollitia assumenda unde amet voluptatem sequi,
          nobis, eveniet cupiditate corrupti nam facere deserunt alias
          rem perferendis. Saepe possimus laudantium consectetur
          quisquam.
        </p>
      </div>

      <div className="testide-content">
        <div className="testide-instructions">
          <h1 className="instructions">Instructions</h1>
          <p>
            Write your code in the editor below and click
            &quot;Run&quot; to execute it. The output will be
            displayed in the output section.
          </p>
          <p>
            Use the editor to write JavaScript code. You can use
            console.log to print output.
          </p>
          <p>For example, you can write:</p>
          <pre>console.log(&quot;Hello, World!&quot;);</pre>
          <p>
            Click &quot;Run&quot; to see the output in the output
            section.
          </p>
          <p>
            Feel free to experiment with different JavaScript code
            snippets.
          </p>
          <p>Have fun coding!</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Eius, illo, nulla excepturi soluta deleniti beatae magnam
            deserunt facilis eveniet dolores error, veritatis quos
            vero fuga cupiditate sint! Laborum, magnam ducimus? Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Autem
            voluptates illum et? Obcaecati dicta nulla nemo quasi
            laborum labore voluptatem atque asperiores? Dolorum animi
            perferendis distinctio suscipit mollitia, harum modi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Architecto nihil dignissimos repudiandae optio maxime
            rerum nam dolore minus exercitationem hic. Excepturi harum
            minus repudiandae hic, aut nesciunt labore reprehenderit
            dolore. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Iure, laborum magnam. Blanditiis, officiis,
            perspiciatis fugit cumque quidem ea natus vel doloribus
            est, cupiditate dolorum! Tempora et atque alias quisquam
            quia. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sed quam aliquam corporis tenetur dolores iure vero
            nisi, atque dolorum distinctio labore fugit officia
            asperiores eum harum nesciunt rem. Mollitia, ut. Lorem
            ipsum dolor sit amet consectetur adipisicing elit.
            Nesciunt enim perferendis optio ea libero voluptas,
            labore, officiis natus quae facere praesentium quos sequi
            doloremque sapiente. Iure doloribus delectus laboriosam
            fugiat.
          </p>
        </div>
        <div className="testide-container">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}
