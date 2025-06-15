import * as vscode from "vscode"
import * as path from "path"
import * as fs from "fs-extra"
import { parseDDL } from "./ddlParser"
import { getTemplateContext, renderTemplate, showFileList, getFilePathForOutput } from "./codeGeneratorUtils"

// 미리 정의된 템플릿들 (실제 egovframe-pack에서 가져와야 함)
const defaultTemplates = {
	"Controller.hbs": `package {{packageName}}.web;

import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import {{parameterType}};
import {{packageName}}.service.{{className}}Service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springmodules.validation.commons.DefaultBeanValidator;

/**
 * {{className}} Controller
 * @author {{author}}
 * @since {{date}}
 * @version {{version}}
 */
@Controller
public class {{className}}Controller {
    
    private static final Logger LOGGER = LoggerFactory.getLogger({{className}}Controller.class);
    
    @Resource(name = "{{classNameFirstCharLower}}Service")
    private {{className}}Service {{classNameFirstCharLower}}Service;
    
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
    
    @Resource(name = "beanValidator")
    protected DefaultBeanValidator beanValidator;
    
    /**
     * {{className}} 목록을 조회한다.
     */
    @RequestMapping(value = "/{{classNameFirstCharLower}}/{{classNameFirstCharLower}}List.do")
    public String select{{className}}List(@ModelAttribute("searchVO") {{className}}VO searchVO, ModelMap model) throws Exception {
        
        searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
        searchVO.setPageSize(propertiesService.getInt("pageSize"));
        
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
        paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
        paginationInfo.setPageSize(searchVO.getPageSize());
        
        searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
        searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
        
        List<{{className}}VO> {{classNameFirstCharLower}}List = {{classNameFirstCharLower}}Service.select{{className}}List(searchVO);
        model.addAttribute("resultList", {{classNameFirstCharLower}}List);
        
        int totCnt = {{classNameFirstCharLower}}Service.select{{className}}ListTotCnt(searchVO);
        paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
        
        return "{{classNameFirstCharLower}}/{{classNameFirstCharLower}}List";
    }
    
    /**
     * {{className}} 상세정보를 조회한다.
     */
    @RequestMapping(value = "/{{classNameFirstCharLower}}/{{classNameFirstCharLower}}Detail.do")
    public String select{{className}}Detail({{className}}VO {{classNameFirstCharLower}}VO, ModelMap model) throws Exception {
        {{className}}VO result = {{classNameFirstCharLower}}Service.select{{className}}Detail({{classNameFirstCharLower}}VO);
        model.addAttribute("{{classNameFirstCharLower}}VO", result);
        
        return "{{classNameFirstCharLower}}/{{classNameFirstCharLower}}Detail";
    }
    
    /**
     * {{className}} 등록화면을 호출한다.
     */
    @RequestMapping(value = "/{{classNameFirstCharLower}}/{{classNameFirstCharLower}}Regist.do")
    public String {{classNameFirstCharLower}}Regist(@ModelAttribute("{{classNameFirstCharLower}}VO") {{className}}VO {{classNameFirstCharLower}}VO, ModelMap model) throws Exception {
        return "{{classNameFirstCharLower}}/{{classNameFirstCharLower}}Regist";
    }
    
    /**
     * {{className}}를 등록한다.
     */
    @RequestMapping(value = "/{{classNameFirstCharLower}}/add{{className}}.do")
    public String add{{className}}(@ModelAttribute("{{classNameFirstCharLower}}VO") {{className}}VO {{classNameFirstCharLower}}VO, BindingResult bindingResult, ModelMap model) throws Exception {
        
        beanValidator.validate({{classNameFirstCharLower}}VO, bindingResult);
        if (bindingResult.hasErrors()) {
            return "{{classNameFirstCharLower}}/{{classNameFirstCharLower}}Regist";
        }
        
        {{classNameFirstCharLower}}Service.insert{{className}}({{classNameFirstCharLower}}VO);
        
        return "redirect:/{{classNameFirstCharLower}}/{{classNameFirstCharLower}}List.do";
    }
    
    /**
     * {{className}} 수정화면을 호출한다.
     */
    @RequestMapping(value = "/{{classNameFirstCharLower}}/{{classNameFirstCharLower}}Updt.do")
    public String {{classNameFirstCharLower}}Updt({{className}}VO {{classNameFirstCharLower}}VO, ModelMap model) throws Exception {
        {{className}}VO result = {{classNameFirstCharLower}}Service.select{{className}}Detail({{classNameFirstCharLower}}VO);
        model.addAttribute("{{classNameFirstCharLower}}VO", result);
        
        return "{{classNameFirstCharLower}}/{{classNameFirstCharLower}}Updt";
    }
    
    /**
     * {{className}}를 수정한다.
     */
    @RequestMapping(value = "/{{classNameFirstCharLower}}/updt{{className}}.do")
    public String updt{{className}}(@ModelAttribute("{{classNameFirstCharLower}}VO") {{className}}VO {{classNameFirstCharLower}}VO, BindingResult bindingResult, ModelMap model) throws Exception {
        
        beanValidator.validate({{classNameFirstCharLower}}VO, bindingResult);
        if (bindingResult.hasErrors()) {
            return "{{classNameFirstCharLower}}/{{classNameFirstCharLower}}Updt";
        }
        
        {{classNameFirstCharLower}}Service.update{{className}}({{classNameFirstCharLower}}VO);
        
        return "redirect:/{{classNameFirstCharLower}}/{{classNameFirstCharLower}}List.do";
    }
    
    /**
     * {{className}}를 삭제한다.
     */
    @RequestMapping(value = "/{{classNameFirstCharLower}}/delete{{className}}.do")
    public String delete{{className}}({{className}}VO {{classNameFirstCharLower}}VO) throws Exception {
        {{classNameFirstCharLower}}Service.delete{{className}}({{classNameFirstCharLower}}VO);
        
        return "redirect:/{{classNameFirstCharLower}}/{{classNameFirstCharLower}}List.do";
    }
}`,

	"Service.hbs": `package {{packageName}}.service;

import java.util.List;

/**
 * {{className}} Service Interface
 * @author {{author}}
 * @since {{date}}
 * @version {{version}}
 */
public interface {{className}}Service {
    
    /**
     * {{className}} 목록을 조회한다.
     * @param searchVO 검색조건
     * @return {{className}} 목록
     * @throws Exception
     */
    List<{{className}}VO> select{{className}}List({{className}}VO searchVO) throws Exception;
    
    /**
     * {{className}} 총 갯수를 조회한다.
     * @param searchVO 검색조건
     * @return {{className}} 총 갯수
     * @throws Exception
     */
    int select{{className}}ListTotCnt({{className}}VO searchVO) throws Exception;
    
    /**
     * {{className}} 상세정보를 조회한다.
     * @param {{classNameFirstCharLower}}VO {{className}}VO
     * @return {{className}} 상세정보
     * @throws Exception
     */
    {{className}}VO select{{className}}Detail({{className}}VO {{classNameFirstCharLower}}VO) throws Exception;
    
    /**
     * {{className}}를 등록한다.
     * @param {{classNameFirstCharLower}}VO {{className}}VO
     * @throws Exception
     */
    void insert{{className}}({{className}}VO {{classNameFirstCharLower}}VO) throws Exception;
    
    /**
     * {{className}}를 수정한다.
     * @param {{classNameFirstCharLower}}VO {{className}}VO
     * @throws Exception
     */
    void update{{className}}({{className}}VO {{classNameFirstCharLower}}VO) throws Exception;
    
    /**
     * {{className}}를 삭제한다.
     * @param {{classNameFirstCharLower}}VO {{className}}VO
     * @throws Exception
     */
    void delete{{className}}({{className}}VO {{classNameFirstCharLower}}VO) throws Exception;
}`,

	"ServiceImpl.hbs": `package {{packageName}}.service.impl;

import {{packageName}}.service.{{className}}Service;
import {{packageName}}.service.{{className}}VO;
import {{packageName}}.service.impl.{{className}}Mapper;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * {{className}} Service Implementation
 * @author {{author}}
 * @since {{date}}
 * @version {{version}}
 */
@Service("{{classNameFirstCharLower}}Service")
public class {{className}}ServiceImpl extends EgovAbstractServiceImpl implements {{className}}Service {
    
    private static final Logger LOGGER = LoggerFactory.getLogger({{className}}ServiceImpl.class);
    
    @Resource(name = "{{classNameFirstCharLower}}Mapper")
    private {{className}}Mapper {{classNameFirstCharLower}}Mapper;
    
    /**
     * {{className}} 목록을 조회한다.
     */
    @Override
    public List<{{className}}VO> select{{className}}List({{className}}VO searchVO) throws Exception {
        return {{classNameFirstCharLower}}Mapper.select{{className}}List(searchVO);
    }
    
    /**
     * {{className}} 총 갯수를 조회한다.
     */
    @Override
    public int select{{className}}ListTotCnt({{className}}VO searchVO) throws Exception {
        return {{classNameFirstCharLower}}Mapper.select{{className}}ListTotCnt(searchVO);
    }
    
    /**
     * {{className}} 상세정보를 조회한다.
     */
    @Override
    public {{className}}VO select{{className}}Detail({{className}}VO {{classNameFirstCharLower}}VO) throws Exception {
        return {{classNameFirstCharLower}}Mapper.select{{className}}Detail({{classNameFirstCharLower}}VO);
    }
    
    /**
     * {{className}}를 등록한다.
     */
    @Override
    public void insert{{className}}({{className}}VO {{classNameFirstCharLower}}VO) throws Exception {
        {{classNameFirstCharLower}}Mapper.insert{{className}}({{classNameFirstCharLower}}VO);
    }
    
    /**
     * {{className}}를 수정한다.
     */
    @Override
    public void update{{className}}({{className}}VO {{classNameFirstCharLower}}VO) throws Exception {
        {{classNameFirstCharLower}}Mapper.update{{className}}({{classNameFirstCharLower}}VO);
    }
    
    /**
     * {{className}}를 삭제한다.
     */
    @Override
    public void delete{{className}}({{className}}VO {{classNameFirstCharLower}}VO) throws Exception {
        {{classNameFirstCharLower}}Mapper.delete{{className}}({{classNameFirstCharLower}}VO);
    }
}`,
}

export async function generateCrudFromDDL(ddl: string, context: vscode.ExtensionContext): Promise<void> {
	const selectedFolder = await vscode.window.showOpenDialog({
		title: "Select Folder to Save Generated Files",
		canSelectFolders: true,
		canSelectFiles: false,
		canSelectMany: false,
		openLabel: "Select Folder",
	})

	if (!selectedFolder || selectedFolder.length === 0) {
		vscode.window.showErrorMessage("No folder selected.")
		return
	}

	const folderPath = selectedFolder[0].fsPath

	try {
		const { tableName, attributes, pkAttributes } = parseDDL(ddl)
		const templateContext = getTemplateContext(tableName, attributes, pkAttributes)

		const files: { filePath: string; content: string }[] = []

		// Generate files from default templates
		for (const [templateName, templateContent] of Object.entries(defaultTemplates)) {
			const fileName = templateName
				.replace(".hbs", ".java")
				.replace("Controller", `${tableName}Controller`)
				.replace("Service", `${tableName}Service`)
				.replace("ServiceImpl", `${tableName}ServiceImpl`)

			// Create temporary template file
			const tempTemplatePath = path.join(context.globalStorageUri.fsPath, `temp_${templateName}`)
			await fs.ensureDir(path.dirname(tempTemplatePath))
			await fs.writeFile(tempTemplatePath, templateContent)

			// Render template
			const renderedContent = await renderTemplate(tempTemplatePath, templateContext)

			// Remove temporary file
			await fs.remove(tempTemplatePath)

			files.push({
				filePath: getFilePathForOutput(folderPath, tableName, fileName),
				content: renderedContent,
			})
		}

		const selectedFilePaths = await showFileList(files)

		for (const file of files) {
			if (selectedFilePaths.includes(file.filePath)) {
				await fs.outputFile(file.filePath, file.content)

				// Open the newly created file in the editor
				const document = await vscode.workspace.openTextDocument(file.filePath)
				await vscode.window.showTextDocument(document)
			}
		}

		vscode.window.showInformationMessage("Selected files generated successfully.")
	} catch (error) {
		throw error
	}
}

export async function uploadTemplates(ddl: string): Promise<void> {
	const selectedFiles = await vscode.window.showOpenDialog({
		title: "Select HBS Template Files to Upload",
		canSelectFolders: false,
		canSelectFiles: true,
		canSelectMany: true,
		filters: { "Handlebars Templates": ["hbs"], "All Files": ["*"] },
	})

	if (!selectedFiles || selectedFiles.length === 0) {
		vscode.window.showErrorMessage("No files selected.")
		return
	}

	const selectedFolderPath = path.dirname(selectedFiles[0].fsPath)

	for (const file of selectedFiles) {
		const templatePath = file.fsPath
		const outputPath = path.join(selectedFolderPath, path.basename(file.fsPath, ".hbs") + ".generated")

		try {
			const { tableName, attributes, pkAttributes } = parseDDL(ddl)
			const context = getTemplateContext(tableName, attributes, pkAttributes)
			const renderedContent = await renderTemplate(templatePath, context)
			await fs.writeFile(outputPath, renderedContent)
			vscode.window.showInformationMessage(`Custom template saved successfully to ${outputPath}`)

			// Open the newly created file in the editor
			const document = await vscode.workspace.openTextDocument(outputPath)
			await vscode.window.showTextDocument(document)
		} catch (error) {
			throw error
		}
	}
}

export async function downloadTemplateContext(ddl: string, context: any): Promise<void> {
	const selectedFolder = await vscode.window.showOpenDialog({
		title: "Select Folder to Save JSON",
		canSelectFolders: true,
		canSelectFiles: false,
		canSelectMany: false,
		openLabel: "Select Folder",
	})

	if (!selectedFolder || selectedFolder.length === 0) {
		vscode.window.showErrorMessage("No folder selected.")
		return
	}

	const folderPath = selectedFolder[0].fsPath

	try {
		const { tableName } = parseDDL(ddl)
		const jsonContent = JSON.stringify(context, null, 2)
		const outputPath = path.join(folderPath, `${tableName}_TemplateContext.json`)
		await fs.writeFile(outputPath, jsonContent)
		vscode.window.showInformationMessage(`TemplateContext JSON saved successfully to ${outputPath}`)

		// Open the newly created file in the editor
		const document = await vscode.workspace.openTextDocument(outputPath)
		await vscode.window.showTextDocument(document)
	} catch (error) {
		throw error
	}
}
